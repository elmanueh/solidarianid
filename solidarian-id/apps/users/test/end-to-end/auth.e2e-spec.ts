import { AuthModule } from '@app/users/infrastructure/auth/auth.module';
import { RefreshTokenEntity } from '@app/users/infrastructure/persistence/entities/refresh-token.entity';
import { UserPreferenceEntity } from '@app/users/infrastructure/persistence/entities/user-preference.entity';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UsersModule } from '@app/users/users.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
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
  });

  describe('/api/auth/logout (POST)', () => {
    it('clears AccessToken and RefreshToken cookies', async () => {
      const response = await server.getRequest().post('/api/auth/logout');

      expect(response.status).toBe(HttpStatus.OK);
      const setCookie = response.header['set-cookie'] as string[];
      expect(setCookie.some(cookie => cookie.startsWith('AccessToken=;'))).toBe(true);
      expect(setCookie.some(cookie => cookie.startsWith('RefreshToken=;'))).toBe(true);
    });
  });
});
