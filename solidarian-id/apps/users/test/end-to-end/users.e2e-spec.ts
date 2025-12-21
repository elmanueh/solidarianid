// test/users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { App } from 'supertest/types';
import { UsersModule } from '@app/users/users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (POST)', () => {
    // Test 1: Register a new user successfully
    it('Test 1 - should register a new user successfully', async () => {
      const newUser = {
        username: 'johnDoe',
        mobilePhone: '+34612345678',
        password: 'SecureP*ssw0rd123',
        city: 'Madrid',
        countryCode: 'ES',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(HttpStatus.CREATED);

      expect(res.headers.location).toBeDefined();
    });

    // Test 2: Register user with international phone (US)
    it('Test 2 - should register user with international phone US', async () => {
      const newUser = {
        username: 'janeSmith',
        mobilePhone: '+15551234567',
        password: 'ValidPassword789!',
        city: 'New York',
        countryCode: 'US',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(HttpStatus.CREATED);

      expect(res.headers.location).toBeDefined();
    });

    // Test 3: Try to register with duplicate username (should fail)
    it('Test 3 - should return 409 for duplicate username', async () => {
      const duplicateUser = {
        username: 'johnDoe',
        mobilePhone: '+34677889900',
        password: 'AnotherPass123!',
        city: 'Valencia',
        countryCode: 'ES',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(duplicateUser)
        .expect(HttpStatus.CONFLICT);

      const body = res.body as { message: string };
      expect(body.message).toContain('already signed up');
    });

    // Test 4: Validation error - username too short
    it('Test 4 - should return 400 for username too short', async () => {
      const invalidUser = {
        username: 'a',
        mobilePhone: '+34612345678',
        password: 'SecureP*ssw0rd123',
        city: 'Madrid',
        countryCode: 'ES',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser)
        .expect(HttpStatus.BAD_REQUEST);

      const body = res.body as { message: string | string[] };
      const message = Array.isArray(body.message)
        ? body.message.join(' ')
        : body.message;
      expect(message).toContain('username');
    });

    // Test 5: Validation error - password too short
    it('Test 5 - should return 400 for password too short', async () => {
      const invalidUser = {
        username: 'testUser',
        mobilePhone: '+34612345678',
        password: '123',
        city: 'Madrid',
        countryCode: 'ES',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser)
        .expect(HttpStatus.BAD_REQUEST);

      const body = res.body as { message: string | string[] };
      const message = Array.isArray(body.message)
        ? body.message.join(' ')
        : body.message;
      expect(message).toContain('password');
    });

    // Test 6: Validation error - invalid country code
    it('Test 6 - should return 400 for invalid country code', async () => {
      const invalidUser = {
        username: 'invalidCountry',
        mobilePhone: '+34612345678',
        password: 'SecureP*ssw0rd123',
        city: 'Madrid',
        countryCode: 'INVALID',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser)
        .expect(HttpStatus.BAD_REQUEST);

      const body = res.body as { message: string | string[] };
      const message = Array.isArray(body.message)
        ? body.message.join(' ')
        : body.message;
      expect(message).toContain('countryCode');
    });

    // Test 7: Validation error - missing required field (mobilePhone)
    it('Test 7 - should return 400 for missing mobilePhone', async () => {
      const invalidUser = {
        username: 'missingPhone',
        password: 'SecureP*ssw0rd123',
        city: 'Madrid',
        countryCode: 'ES',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser)
        .expect(HttpStatus.BAD_REQUEST);

      const body = res.body as { message: string | string[] };
      const message = Array.isArray(body.message)
        ? body.message.join(' ')
        : body.message;
      expect(message).toContain('mobilePhone');
    });

    // Test 8: Validation error - empty username
    it('Test 8 - should return 400 for empty username', async () => {
      const invalidUser = {
        username: '',
        mobilePhone: '+34612345678',
        password: 'SecureP*ssw0rd123',
        city: 'Madrid',
        countryCode: 'ES',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser)
        .expect(HttpStatus.BAD_REQUEST);

      const body = res.body as { message: string | string[] };
      const message = Array.isArray(body.message)
        ? body.message.join(' ')
        : body.message;
      expect(message).toContain('username');
    });

    // Test 9: Invalid phone format
    it('Test 9 - should return 400 for invalid phone format', async () => {
      const invalidUser = {
        username: 'testInvalidPhone',
        mobilePhone: '612345678',
        password: 'SecureP*ssw0rd123',
        city: 'Madrid',
        countryCode: 'ES',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser)
        .expect(HttpStatus.BAD_REQUEST);

      const body = res.body as { message: string | string[] };
      const message = Array.isArray(body.message)
        ? body.message.join(' ')
        : body.message;
      expect(message.toLowerCase()).toContain('phone');
    });

    // Test 10: Non-whitelisted fields should be REJECTED
    it('Test 10 - should return 400 for non-whitelisted fields', async () => {
      const invalidUser = {
        username: 'extraFieldsTest',
        mobilePhone: '+34633444555',
        password: 'SecureP*ssw0rd123',
        city: 'Málaga',
        countryCode: 'ES',
        extraField: 'should be ignored', // ← RECHAZADO
        anotherField: 12345, // ← RECHAZADO
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser)
        .expect(HttpStatus.BAD_REQUEST);

      const body = res.body as { message: string | string[] };
      const message = Array.isArray(body.message)
        ? body.message.join(' ')
        : body.message;
      expect(message).toMatch(/extraField|anotherField/);
    });
  });
});
