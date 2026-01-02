import { INestApplication } from '@nestjs/common';
import { AuthModule } from '@app/admin/auth/auth.module';
import { Connection } from 'mongoose';
import { MongoDBSeeder, MongoDBTestContainer, MongoDBTestModule, TestServerHelper } from '@solidarianid/testing';

describe('AuthController (e2e)', () => {
  const validRegisterData = {
    fullName: 'Test Administrator',
    email: 'test.admin@solidarianid.org',
    phone: '+34612345999',
    password: 'Admin2024!Pass',
  };

  let server!: TestServerHelper;
  let app!: INestApplication;
  let seeder!: MongoDBSeeder;

  beforeAll(async () => {
    const databaseModule = await MongoDBTestModule.forRoot();
    server = new TestServerHelper();
    app = await server.create({
      imports: [databaseModule, AuthModule],
    });

    const connection: Connection = app.get<Connection>('Connection');
    seeder = new MongoDBSeeder(connection);
  });

  afterAll(async () => {
    if (server) await server.close();
    await MongoDBTestContainer.getInstance().stop();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new administrator successfully', async () => {
      const response = await server.getRequest().post('/api/auth/register').send(validRegisterData).expect(201);

      expect(response.body).toHaveProperty('fullName', validRegisterData.fullName);
      expect(response.body).toHaveProperty('email', validRegisterData.email);
      expect(response.body).toHaveProperty('phone', validRegisterData.phone);
      expect(response.headers).toHaveProperty('location');
    });

    it('should return 409 Conflict when email already exists', async () => {
      // First registration
      await server
        .getRequest()
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          email: 'duplicate@solidarianid.org',
          phone: '+34612345998',
        })
        .expect(201);

      // Second registration with same email
      await server
        .getRequest()
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          email: 'duplicate@solidarianid.org',
          phone: '+34612345997',
        })
        .expect(409);
    });

    it('should return 400 Bad Request when fullName is empty', async () => {
      const response = await server
        .getRequest()
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          fullName: '',
          email: 'another@solidarianid.org',
        })
        .expect(400);

      expect(response.body.error).toHaveProperty('message');
      expect(Array.isArray(response.body.error.message)).toBe(true);
      expect(response.body.error.message).toContain('El nombre completo es obligatorio');
    });

    it('should return 400 Bad Request when email is invalid', async () => {
      await server
        .getRequest()
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          email: 'invalid-email',
        })
        .expect(400);
    });

    it('should return 400 Bad Request when phone format is invalid', async () => {
      await server
        .getRequest()
        .post('/api/auth/register')
        .send({
          ...validRegisterData,
          email: 'phone.test@solidarianid.org',
          phone: '612345678', // Missing country code
        })
        .expect(400);
    });

    it('should return 400 Bad Request when password is too weak', async () => {
      await server
        .getRequest()
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
      await seeder.clean();
      await seeder.seedAdministrators();
    });

    it('should login successfully with valid credentials', async () => {
      const response = await server
        .getRequest()
        .post('/api/auth/login')
        .send({
          email: 'login.test@solidarianid.org',
          password: 'Admin2024!Pass',
        })
        .expect(200);

      expect(response.body).toHaveProperty('fullName', 'Login Test User');
      expect(response.body).toHaveProperty('email', 'login.test@solidarianid.org');
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should return 401 Unauthorized when email does not exist', async () => {
      await server
        .getRequest()
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@solidarianid.org',
          password: 'Admin2024!Pass',
        })
        .expect(401);
    });

    it('should return 401 Unauthorized when password is incorrect', async () => {
      await server
        .getRequest()
        .post('/api/auth/login')
        .send({
          email: 'login.test@solidarianid.org',
          password: 'WrongPassword123!',
        })
        .expect(401);
    });

    it('should return 400 Bad Request when email is missing', async () => {
      await server
        .getRequest()
        .post('/api/auth/login')
        .send({
          password: 'Admin2024!Pass',
        })
        .expect(400);
    });

    it('should return 400 Bad Request when password is missing', async () => {
      await server
        .getRequest()
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
      const loginResponse = await server
        .getRequest()
        .post('/api/auth/login')
        .send({
          email: 'login.test@solidarianid.org',
          password: 'Admin2024!Pass',
        })
        .expect(200);

      const cookies = loginResponse.headers['set-cookie'];

      // Then logout
      await server.getRequest().post('/api/auth/logout').set('Cookie', cookies).expect(204);
    });

    it('should return 204 even without active session', async () => {
      await server.getRequest().post('/api/auth/logout').expect(204);
    });
  });

  describe('Integration flow: Register → Login → Logout', () => {
    it('should complete full authentication flow successfully', async () => {
      const uniqueEmail = `flow.test.${Date.now()}@solidarianid.org`;

      // Step 1: Register
      const registerResponse = await server
        .getRequest()
        .post('/api/auth/register')
        .send({
          fullName: 'Flow Test User',
          email: uniqueEmail,
          phone: '+34612345200',
          password: 'Admin2024!Pass',
        })
        .expect(201);

      expect(registerResponse.body).toHaveProperty('fullName', 'Flow Test User');
      expect(registerResponse.body).toHaveProperty('email', uniqueEmail);

      // Step 2: Login
      const loginResponse = await server
        .getRequest()
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
      await server.getRequest().post('/api/auth/logout').set('Cookie', cookies).expect(204);
    });
  });
});
