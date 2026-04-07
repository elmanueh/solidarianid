import { AuthModule } from '@app/users/infrastructure/auth/auth.module';
import { RefreshTokenEntity } from '@app/users/infrastructure/persistence/entities/refresh-token.entity';
import { UserPreferenceEntity } from '@app/users/infrastructure/persistence/entities/user-preference.entity';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UsersModule } from '@app/users/users.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  KafkaTestModule,
  PostgreSQLSeeder,
  PostgreSQLTestModule,
  TestContainerLifecycle,
  TestServerHelper,
} from '@solidarianid/testing';
import { DataSource } from 'typeorm';

describe('AuthController (e2e)', () => {
  let server!: TestServerHelper;
  let app: INestApplication;
  let seeder!: PostgreSQLSeeder;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await PostgreSQLTestModule.forRoot([UserEntity, UserPreferenceEntity, RefreshTokenEntity]);

    server = new TestServerHelper();
    app = await server.create({
      imports: [messageModule, databaseModule, UsersModule, AuthModule],
    });

    const dataSource = app.get<DataSource>('DataSource');
    seeder = new PostgreSQLSeeder(dataSource);
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedUsers();
  });

  afterAll(async () => {
    await app.close();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  describe('/api/auth/login (POST)', () => {
    it('sets AccessToken and RefreshToken cookies and does not return tokens in body', async () => {
      const response = await server.getRequest().post('/api/auth/login').send({
        username: 'testUsername',
        password: 'Admin2024!Pass',
      });

      expect(response.status).toBe(HttpStatus.OK);
      const setCookie = response.header['set-cookie'] as string[];
      expect(setCookie.some(cookie => cookie.startsWith('AccessToken='))).toBe(true);
      expect(setCookie.some(cookie => cookie.startsWith('RefreshToken='))).toBe(true);
      expect(setCookie.some(cookie => cookie.includes('Path=/;'))).toBe(true);
      expect(setCookie.some(cookie => cookie.includes('Path=/api/auth/refresh;'))).toBe(true);
      expect(response.body.accessToken).toBeUndefined();
      expect(response.body.refreshToken).toBeUndefined();
    });

    it('returns the same auth failure response for unknown user and wrong password', async () => {
      const wrongPasswordResponse = await server.getRequest().post('/api/auth/login').send({
        username: 'testUsername',
        password: 'WrongPassword123!',
      });

      const unknownUserResponse = await server.getRequest().post('/api/auth/login').send({
        username: 'ghostUser',
        password: 'Admin2024!Pass',
      });

      expect(wrongPasswordResponse.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(unknownUserResponse.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(wrongPasswordResponse.body.error.message).toBe(unknownUserResponse.body.error.message);
    });

    it('returns 404 for removed legacy login endpoint', async () => {
      await server
        .getRequest()
        .post('/api/users/login')
        .send({
          username: 'testUsername',
          password: 'Admin2024!Pass',
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('supports concurrent sessions and persists optional X-Device-Id', async () => {
      const deviceALogin = await server
        .getRequest()
        .post('/api/auth/login')
        .set('X-Device-Id', 'device-A')
        .send({ username: 'testUsername', password: 'Admin2024!Pass' });

      const deviceBLogin = await server
        .getRequest()
        .post('/api/auth/login')
        .set('X-Device-Id', 'device-B')
        .send({ username: 'testUsername', password: 'Admin2024!Pass' });

      expect(deviceALogin.status).toBe(HttpStatus.OK);
      expect(deviceBLogin.status).toBe(HttpStatus.OK);

      const tokenRepo = app.get<DataSource>('DataSource').getRepository(RefreshTokenEntity);
      const sessions = await tokenRepo.find({ where: { userId: '4807f235-f4b4-41c0-939c-c97371219551' } });

      expect(sessions).toHaveLength(2);
      expect(sessions.map(session => session.deviceId).sort()).toEqual(['device-A', 'device-B']);
    });
  });

  describe('/api/auth/refresh (POST)', () => {
    it('returns 401 when refresh cookie is missing', async () => {
      await server.getRequest().post('/api/auth/refresh').expect(HttpStatus.UNAUTHORIZED);
    });

    it('issues new cookies when refresh cookie is valid', async () => {
      const loginResponse = await server.getRequest().post('/api/auth/login').send({
        username: 'testUsername',
        password: 'Admin2024!Pass',
      });

      const refreshCookie = (loginResponse.header['set-cookie'] as string[]).find(cookie =>
        cookie.startsWith('RefreshToken='),
      );

      expect(refreshCookie).toBeDefined();

      const refreshResponse = await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', (refreshCookie as string).split(';')[0]);

      expect(refreshResponse.status).toBe(HttpStatus.OK);
      const setCookie = refreshResponse.header['set-cookie'] as string[];
      expect(setCookie.some(cookie => cookie.startsWith('AccessToken='))).toBe(true);
      expect(setCookie.some(cookie => cookie.startsWith('RefreshToken='))).toBe(true);
      expect(refreshResponse.body.accessToken).toBeUndefined();
      expect(refreshResponse.body.refreshToken).toBeUndefined();
    });

    it('returns 401 when refresh cookie is invalid', async () => {
      await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', 'RefreshToken=invalid')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('refreshes only the targeted session cookie and keeps other session valid', async () => {
      const loginA = await server
        .getRequest()
        .post('/api/auth/login')
        .set('X-Device-Id', 'device-A')
        .send({ username: 'testUsername', password: 'Admin2024!Pass' });
      const loginB = await server
        .getRequest()
        .post('/api/auth/login')
        .set('X-Device-Id', 'device-B')
        .send({ username: 'testUsername', password: 'Admin2024!Pass' });

      const cookieA = (loginA.header['set-cookie'] as string[]).find(cookie => cookie.startsWith('RefreshToken='));
      const cookieB = (loginB.header['set-cookie'] as string[]).find(cookie => cookie.startsWith('RefreshToken='));

      expect(cookieA).toBeDefined();
      expect(cookieB).toBeDefined();

      const refreshA = await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', (cookieA as string).split(';')[0]);

      expect(refreshA.status).toBe(HttpStatus.OK);

      const refreshB = await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', (cookieB as string).split(';')[0]);

      expect(refreshB.status).toBe(HttpStatus.OK);
    });

    it('rejects one request when two concurrent refresh requests use the same token', async () => {
      const loginResponse = await server.getRequest().post('/api/auth/login').send({
        username: 'testUsername',
        password: 'Admin2024!Pass',
      });

      const refreshCookie = (loginResponse.header['set-cookie'] as string[]).find(cookie =>
        cookie.startsWith('RefreshToken='),
      );

      expect(refreshCookie).toBeDefined();

      const tokenCookie = (refreshCookie as string).split(';')[0];

      const [first, second] = await Promise.all([
        server.getRequest().post('/api/auth/refresh').set('Cookie', tokenCookie),
        server.getRequest().post('/api/auth/refresh').set('Cookie', tokenCookie),
      ]);

      expect([first.status, second.status].sort()).toEqual([HttpStatus.OK, HttpStatus.UNAUTHORIZED]);
    });
  });

  describe('/api/auth/logout (POST)', () => {
    it('clears AccessToken and RefreshToken cookies', async () => {
      const response = await server.getRequest().post('/api/auth/logout');

      expect(response.status).toBe(HttpStatus.OK);
      const setCookie = response.header['set-cookie'] as string[];
      expect(setCookie.some(cookie => cookie.startsWith('AccessToken=;'))).toBe(true);
      expect(setCookie.some(cookie => cookie.startsWith('RefreshToken=;'))).toBe(true);
    });

    it('revokes only current session and keeps other session active', async () => {
      const loginA = await server
        .getRequest()
        .post('/api/auth/login')
        .set('X-Device-Id', 'device-A')
        .send({ username: 'testUsername', password: 'Admin2024!Pass' });
      const loginB = await server
        .getRequest()
        .post('/api/auth/login')
        .set('X-Device-Id', 'device-B')
        .send({ username: 'testUsername', password: 'Admin2024!Pass' });

      const cookieA = (loginA.header['set-cookie'] as string[]).find(cookie => cookie.startsWith('RefreshToken='));
      const cookieB = (loginB.header['set-cookie'] as string[]).find(cookie => cookie.startsWith('RefreshToken='));

      expect(cookieA).toBeDefined();
      expect(cookieB).toBeDefined();

      await server
        .getRequest()
        .post('/api/auth/logout')
        .set('Cookie', (cookieA as string).split(';')[0])
        .expect(HttpStatus.OK);

      await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', (cookieA as string).split(';')[0])
        .expect(HttpStatus.UNAUTHORIZED);

      await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', (cookieB as string).split(';')[0])
        .expect(HttpStatus.OK);
    });

    it('returns 401 on logout when refresh token has no jti', async () => {
      const legacyToken = await app.get(JwtService).signAsync(
        { sub: '4807f235-f4b4-41c0-939c-c97371219551' },
        { algorithm: 'RS256', expiresIn: '90d' },
      );

      await server
        .getRequest()
        .post('/api/auth/logout')
        .set('Cookie', `RefreshToken=${legacyToken}`)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
