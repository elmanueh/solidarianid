import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import request from 'supertest';
import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import session from 'express-session';
import { AuthModule } from '../../src/auth/auth.module';
import { ConflictErrorFilter } from '../../src/administrator/controllers/filters/conflict-error.filter';
import { AuthenticationErrorFilter } from '../../src/administrator/controllers/filters/authentication-error.filter';
import { ValidationErrorFilter } from '../../src/administrator/controllers/filters/validation-error.filter';
import { Application } from 'express';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let mongoContainer: StartedTestContainer;
  let mongoUri: string;

  // Test configuration
  const testMongoUser = 'test';
  const testMongoPassword = 'test';
  const testMongoDb = 'solidarianid-test';
  const testSessionSecret = 'test-secret-key-for-e2e-tests';

  // Valid test data
  const validRegisterData = {
    fullName: 'Test Administrator',
    email: 'test.admin@solidarianid.org',
    phone: '+34612345999',
    password: 'Admin2024!Pass',
  };

  beforeAll(async () => {
    // Start MongoDB container
    mongoContainer = await new GenericContainer(
      'mongo@sha256:4b58ebcb1dc7a7b4e84cd8ce9098d48764ae4478876898ff9551acf2ac4a6a6d',
    )
      .withExposedPorts(27017)
      .withEnvironment({
        MONGO_INITDB_ROOT_USERNAME: testMongoUser,
        MONGO_INITDB_ROOT_PASSWORD: testMongoPassword,
      })
      .withWaitStrategy(Wait.forLogMessage('Waiting for connections'))
      .start();

    const host = mongoContainer.getHost();
    const port = mongoContainer.getMappedPort(27017);
    mongoUri = `mongodb://${testMongoUser}:${testMongoPassword}@${host}:${port}/${testMongoDb}?authSource=admin`;

    // Create testing module
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(mongoUri),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Configure session middleware
    app.use(
      session({
        secret: testSessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: false,
          sameSite: 'lax',
        },
      }),
    );

    // Configure validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Configure exception filters
    app.useGlobalFilters(
      new ConflictErrorFilter(),
      new AuthenticationErrorFilter(),
      new ValidationErrorFilter(),
    );

    await app.init();
  }, 60000); // 60s timeout for container startup

  afterAll(async () => {
    await app?.close();
    await mongoContainer?.stop();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new administrator successfully', async () => {
      const response = await request(app.getHttpServer() as Application)
        .post('/api/auth/register')
        .send(validRegisterData)
        .expect(201);

      expect(response.body).toHaveProperty(
        'fullName',
        validRegisterData.fullName,
      );
      expect(response.body).toHaveProperty('email', validRegisterData.email);
      expect(response.body).toHaveProperty('phone', validRegisterData.phone);
      expect(response.headers).toHaveProperty('location');
    });

    it('should return 409 Conflict when email already exists', async () => {
      // First registration
      await request(app.getHttpServer() as Application)
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          email: 'duplicate@solidarianid.org',
          phone: '+34612345998',
        })
        .expect(201);

      // Second registration with same email
      await request(app.getHttpServer() as Application)
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          email: 'duplicate@solidarianid.org',
          phone: '+34612345997',
        })
        .expect(409);
    });

    it('should return 400 Bad Request when fullName is empty', async () => {
      const response = await request(app.getHttpServer() as Application)
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          fullName: '',
          email: 'another@solidarianid.org',
        })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 Bad Request when email is invalid', async () => {
      await request(app.getHttpServer() as Application)
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          email: 'invalid-email',
        })
        .expect(400);
    });

    it('should return 400 Bad Request when phone format is invalid', async () => {
      await request(app.getHttpServer() as Application)
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          email: 'phone.test@solidarianid.org',
          phone: '612345678', // Missing country code
        })
        .expect(400);
    });

    it('should return 400 Bad Request when password is too weak', async () => {
      await request(app.getHttpServer() as Application)
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          email: 'weak.pass@solidarianid.org',
          password: 'weak',
        })
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeAll(async () => {
      // Create a user for login tests
      await request(app.getHttpServer() as Application)
        .post('/api/auth/register')
        .send({
          fullName: 'Login Test User',
          email: 'login.test@solidarianid.org',
          phone: '+34612345100',
          password: 'Admin2024!Pass',
        });
    });

    it('should login successfully with valid credentials', async () => {
      const response = await request(app.getHttpServer() as Application)
        .post('/api/auth/login')
        .send({
          email: 'login.test@solidarianid.org',
          password: 'Admin2024!Pass',
        })
        .expect(200);

      expect(response.body).toHaveProperty('fullName', 'Login Test User');
      expect(response.body).toHaveProperty(
        'email',
        'login.test@solidarianid.org',
      );
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should return 401 Unauthorized when email does not exist', async () => {
      await request(app.getHttpServer() as Application)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@solidarianid.org',
          password: 'Admin2024!Pass',
        })
        .expect(401);
    });

    it('should return 401 Unauthorized when password is incorrect', async () => {
      await request(app.getHttpServer() as Application)
        .post('/api/auth/login')
        .send({
          email: 'login.test@solidarianid.org',
          password: 'WrongPassword123!',
        })
        .expect(401);
    });

    it('should return 400 Bad Request when email is missing', async () => {
      await request(app.getHttpServer() as Application)
        .post('/api/auth/login')
        .send({
          password: 'Admin2024!Pass',
        })
        .expect(400);
    });

    it('should return 400 Bad Request when password is missing', async () => {
      await request(app.getHttpServer() as Application)
        .post('/api/auth/login')
        .send({
          email: 'login.test@solidarianid.org',
        })
        .expect(400);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully and clear session', async () => {
      // First login to get a session
      const loginResponse = await request(app.getHttpServer() as Application)
        .post('/api/auth/login')
        .send({
          email: 'login.test@solidarianid.org',
          password: 'Admin2024!Pass',
        })
        .expect(200);

      const cookies = loginResponse.headers['set-cookie'];

      // Then logout
      await request(app.getHttpServer() as Application)
        .post('/api/auth/logout')
        .set('Cookie', cookies)
        .expect(204);
    });

    it('should return 204 even without active session', async () => {
      await request(app.getHttpServer() as Application)
        .post('/api/auth/logout')
        .expect(204);
    });
  });

  describe('Integration flow: Register → Login → Logout', () => {
    it('should complete full authentication flow successfully', async () => {
      const uniqueEmail = `flow.test.${Date.now()}@solidarianid.org`;

      // Step 1: Register
      const registerResponse = await request(app.getHttpServer() as Application)
        .post('/api/auth/register')
        .send({
          fullName: 'Flow Test User',
          email: uniqueEmail,
          phone: '+34612345200',
          password: 'Admin2024!Pass',
        })
        .expect(201);

      expect(registerResponse.body).toHaveProperty(
        'fullName',
        'Flow Test User',
      );
      expect(registerResponse.body).toHaveProperty('email', uniqueEmail);

      // Step 2: Login
      const loginResponse = await request(app.getHttpServer() as Application)
        .post('/api/auth/login')
        .send({
          email: uniqueEmail,
          password: 'Admin2024!Pass',
        })
        .expect(200);

      expect(loginResponse.body.email).toBe(uniqueEmail);
      const cookies = loginResponse.headers['set-cookie'];
      expect(cookies).toBeDefined();

      // Step 3: Logout
      await request(app.getHttpServer() as Application)
        .post('/api/auth/logout')
        .set('Cookie', cookies)
        .expect(204);
    });
  });
});
