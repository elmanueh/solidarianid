import { AuthModule } from '@app/users/infrastructure/auth/auth.module';
import { RefreshTokenEntity } from '@app/users/infrastructure/persistence/entities/refresh-token.entity';
import { UserPreferenceEntity } from '@app/users/infrastructure/persistence/entities/user-preference.entity';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { CheckpointProjectionEntity } from '@app/users/infrastructure/persistence/projections/checkpoint.projection.entity';
import { UserProjectionEntity } from '@app/users/infrastructure/persistence/projections/user.projection.entity';
import { UsersProjectionService } from '@app/users/infrastructure/persistence/projections/users-projection.service';
import { UsersModule } from '@app/users/users.module';
import { KurrentDBClient } from '@kurrent/kurrentdb-client';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  KafkaTestModule,
  KurrentDBSeeder,
  KurrentDBTestModule,
  PostgreSQLSeeder,
  PostgreSQLTestModule,
  TestContainerLifecycle,
  TestServerHelper,
} from '@solidarianid/testing';
import { DataSource } from 'typeorm';

function getSetCookieHeaders(headers: Record<string, unknown>): string[] {
  const rawSetCookie = headers['set-cookie'];

  if (Array.isArray(rawSetCookie)) {
    return rawSetCookie.filter((cookie): cookie is string => typeof cookie === 'string');
  }

  if (typeof rawSetCookie === 'string') {
    return [rawSetCookie];
  }

  return [];
}

async function resetState(
  kurrentdbSeeder: KurrentDBSeeder,
  postgresSeeder: PostgreSQLSeeder,
  usersProjectionService: UsersProjectionService,
): Promise<void> {
  await usersProjectionService.onModuleDestroy();

  try {
    await kurrentdbSeeder.clean();
    await kurrentdbSeeder.seedUsers();

    await postgresSeeder.clean();
    const position = await kurrentdbSeeder.getLatestUserCheckpointPosition();
    await postgresSeeder.seedUsersProjection(position.commit, position.prepare);
  } finally {
    await usersProjectionService.onModuleInit();
  }
}

describe('AuthController (e2e)', () => {
  let server!: TestServerHelper;
  let app: INestApplication;
  let seeder!: PostgreSQLSeeder;
  let kurrentdbSeeder!: KurrentDBSeeder;
  let usersProjectionService!: UsersProjectionService;
  let eventStore!: KurrentDBClient;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await PostgreSQLTestModule.forRoot([
      UserEntity,
      UserPreferenceEntity,
      RefreshTokenEntity,
      UserProjectionEntity,
      CheckpointProjectionEntity,
    ]);
    const kurrentdbModule = await KurrentDBTestModule.forRoot();

    const connectionString = process.env.EVENT_STORE_URL!;
    eventStore = KurrentDBClient.connectionString(connectionString);
    kurrentdbSeeder = new KurrentDBSeeder(eventStore);

    server = new TestServerHelper();
    app = await server.create({
      imports: [messageModule, databaseModule, kurrentdbModule, UsersModule, AuthModule],
    });

    const dataSource = app.get<DataSource>('DataSource');
    seeder = new PostgreSQLSeeder(dataSource);
    usersProjectionService = app.get(UsersProjectionService);

    await resetState(kurrentdbSeeder, seeder, usersProjectionService);
  });

  beforeEach(async () => {
    await resetState(kurrentdbSeeder, seeder, usersProjectionService);
    server.resetAgent();
  });

  afterAll(async () => {
    await app.close();
    await eventStore.dispose();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  describe('/api/auth/login (POST)', () => {
    it('sets AccessToken and RefreshToken cookies and does not return tokens in body', async () => {
      const response = await server.getRequest().post('/api/auth/login').send({
        username: 'testUsername',
        password: 'Admin2024!Pass',
      });

      expect(response.status).toBe(HttpStatus.OK);
      const setCookie = getSetCookieHeaders(response.header as Record<string, unknown>);
      expect(setCookie.some(cookie => cookie.startsWith('AccessToken='))).toBe(true);
      expect(setCookie.some(cookie => cookie.startsWith('RefreshToken='))).toBe(true);
      expect(setCookie.some(cookie => cookie.includes('Path=/;'))).toBe(true);
      expect(setCookie.some(cookie => cookie.includes('Path=/;'))).toBe(true);
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

    it('issues only AccessToken cookie when refresh cookie is valid', async () => {
      const loginResponse = await server.getRequest().post('/api/auth/login').send({
        username: 'testUsername',
        password: 'Admin2024!Pass',
      });

      const setCookieHeader = getSetCookieHeaders(loginResponse.header as Record<string, unknown>);

      const refreshCookie = setCookieHeader.find(cookie => cookie.startsWith('RefreshToken='));

      expect(refreshCookie).toBeDefined();
      if (!refreshCookie) {
        throw new Error('RefreshToken cookie missing in login response');
      }

      const refreshResponse = await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', refreshCookie.split(';')[0]);

      expect(refreshResponse.status).toBe(HttpStatus.OK);
      const setCookie = getSetCookieHeaders(refreshResponse.header as Record<string, unknown>);
      expect(setCookie.some(cookie => cookie.startsWith('AccessToken='))).toBe(true);
      expect(setCookie.some(cookie => cookie.startsWith('RefreshToken='))).toBe(false);
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

    it('reuses the same refresh cookie per session and keeps other session valid', async () => {
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

      const cookieA = getSetCookieHeaders(loginA.header as Record<string, unknown>).find(cookie =>
        cookie.startsWith('RefreshToken='),
      );
      const cookieB = getSetCookieHeaders(loginB.header as Record<string, unknown>).find(cookie =>
        cookie.startsWith('RefreshToken='),
      );

      expect(cookieA).toBeDefined();
      expect(cookieB).toBeDefined();
      if (!cookieA || !cookieB) {
        throw new Error('RefreshToken cookie missing in login responses');
      }

      const refreshA = await server.getRequest().post('/api/auth/refresh').set('Cookie', cookieA.split(';')[0]);

      expect(refreshA.status).toBe(HttpStatus.OK);
      const refreshASetCookie = getSetCookieHeaders(refreshA.header as Record<string, unknown>);
      expect(refreshASetCookie.some(cookie => cookie.startsWith('RefreshToken='))).toBe(false);

      const refreshB = await server.getRequest().post('/api/auth/refresh').set('Cookie', cookieB.split(';')[0]);

      expect(refreshB.status).toBe(HttpStatus.OK);
      const refreshBSetCookie = getSetCookieHeaders(refreshB.header as Record<string, unknown>);
      expect(refreshBSetCookie.some(cookie => cookie.startsWith('RefreshToken='))).toBe(false);
    });

    it('keeps refresh session validity window fixed from login time (no expiry extension on refresh)', async () => {
      const loginResponse = await server.getRequest().post('/api/auth/login').send({
        username: 'testUsername',
        password: 'Admin2024!Pass',
      });

      expect(loginResponse.status).toBe(HttpStatus.OK);

      const tokenRepo = app.get<DataSource>('DataSource').getRepository(RefreshTokenEntity);
      const [sessionBeforeRefresh] = await tokenRepo.find({
        where: { userId: '4807f235-f4b4-41c0-939c-c97371219551' },
      });
      expect(sessionBeforeRefresh).toBeDefined();
      if (!sessionBeforeRefresh) {
        throw new Error('Refresh session missing after login');
      }

      const expiresAtBefore = sessionBeforeRefresh.expiresAt.getTime();

      const refreshCookie = getSetCookieHeaders(loginResponse.header as Record<string, unknown>).find(cookie =>
        cookie.startsWith('RefreshToken='),
      );
      expect(refreshCookie).toBeDefined();
      if (!refreshCookie) {
        throw new Error('RefreshToken cookie missing in login response');
      }

      const refreshResponse = await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', refreshCookie.split(';')[0]);

      expect(refreshResponse.status).toBe(HttpStatus.OK);

      const [sessionAfterRefresh] = await tokenRepo.find({ where: { userId: '4807f235-f4b4-41c0-939c-c97371219551' } });
      expect(sessionAfterRefresh).toBeDefined();
      if (!sessionAfterRefresh) {
        throw new Error('Refresh session missing after refresh');
      }

      expect(sessionAfterRefresh.expiresAt.getTime()).toBe(expiresAtBefore);
    });

    it('rejects one request when two concurrent refresh requests use the same token', async () => {
      const loginResponse = await server.getRequest().post('/api/auth/login').send({
        username: 'testUsername',
        password: 'Admin2024!Pass',
      });

      const refreshCookie = getSetCookieHeaders(loginResponse.header as Record<string, unknown>).find(cookie =>
        cookie.startsWith('RefreshToken='),
      );

      expect(refreshCookie).toBeDefined();
      if (!refreshCookie) {
        throw new Error('RefreshToken cookie missing in login response');
      }

      const tokenCookie = refreshCookie.split(';')[0];

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
      const setCookie = getSetCookieHeaders(response.header as Record<string, unknown>);
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

      const cookieA = getSetCookieHeaders(loginA.header as Record<string, unknown>).find(cookie =>
        cookie.startsWith('RefreshToken='),
      );
      const cookieB = getSetCookieHeaders(loginB.header as Record<string, unknown>).find(cookie =>
        cookie.startsWith('RefreshToken='),
      );

      expect(cookieA).toBeDefined();
      expect(cookieB).toBeDefined();
      if (!cookieA || !cookieB) {
        throw new Error('RefreshToken cookie missing in login responses');
      }

      await server.getRequest().post('/api/auth/logout').set('Cookie', cookieA.split(';')[0]).expect(HttpStatus.OK);

      const tokenRepo = app.get<DataSource>('DataSource').getRepository(RefreshTokenEntity);
      const sessionsAfterLogout = await tokenRepo.find({ where: { userId: '4807f235-f4b4-41c0-939c-c97371219551' } });

      expect(sessionsAfterLogout).toHaveLength(2);
      const revokedSessions = sessionsAfterLogout.filter(session => session.revokedAt !== null);
      expect(revokedSessions).toHaveLength(1);
      const activeSessions = sessionsAfterLogout.filter(session => session.revokedAt === null);
      expect(activeSessions).toHaveLength(1);

      const cookieAValue = cookieA.split(';')[0].replace('RefreshToken=', '');
      const revokedSessionIds = new Set(revokedSessions.map(session => session.id));

      const expectedUnauthorizedCookie = revokedSessionIds.has(cookieAValue) ? cookieA : cookieB;
      const expectedAuthorizedCookie = revokedSessionIds.has(cookieAValue) ? cookieB : cookieA;

      await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', expectedUnauthorizedCookie.split(';')[0])
        .expect(HttpStatus.UNAUTHORIZED);

      await server
        .getRequest()
        .post('/api/auth/refresh')
        .set('Cookie', expectedAuthorizedCookie.split(';')[0])
        .expect(HttpStatus.OK);
    });

    it('returns 401 on logout when refresh token has no jti', async () => {
      const legacyToken = await app
        .get(JwtService)
        .signAsync({ sub: '4807f235-f4b4-41c0-939c-c97371219551' }, { algorithm: 'RS256', expiresIn: '90d' });

      await server
        .getRequest()
        .post('/api/auth/logout')
        .set('Cookie', `RefreshToken=${legacyToken}`)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
