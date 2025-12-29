// test/users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { App } from 'supertest/types';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@app/users/users.module';
import { DatabaseTestModule } from '../database-test.module';
import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseTestModule,
        UsersModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (POST)', () => {
    // ÉXITO: Solo status + Location
    it('Test 1 - should register new user', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'johnDoe',
          mobilePhone: '+34612345678',
          password: 'SecureP*ssw0rd123',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.CREATED)
        .expect('Location', /\S+/); // Solo verifica que existe
    });

    it('Test 2 - international phone US', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'janeSmith',
          mobilePhone: '+15551234567',
          password: 'ValidPassword789!',
          city: 'New York',
          countryCode: 'US',
        })
        .expect(HttpStatus.CREATED)
        .expect('Location', /\S+/);
    });

    // ERRORES: Solo status code
    it('Test 3 - duplicate username → 409', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'johnDoe',
          mobilePhone: '+34677889900',
          password: 'SecureP*ssw0rd123',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.CONFLICT);
    });

    it('Test 4 - username too short → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'a',
          mobilePhone: '+34612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 5 - password too short → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          mobilePhone: '+34612345678',
          password: '123',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 6 - invalid country code → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          mobilePhone: '+34612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'XX',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 7 - missing mobilePhone → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 8 - empty username → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: '',
          mobilePhone: '+34612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 9 - invalid phone → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          mobilePhone: '612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 10 - extra fields → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          mobilePhone: '+34612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
          extra: 'field',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
  describe('/users/:id (PATCH)', () => {
    let existingUserId: string;

    beforeAll(async () => {
      // Create a user for PATCH tests
      const response = await request(app.getHttpServer()).post('/users').send({
        username: 'userForUpdate',
        mobilePhone: '+34633310459',
        password: 'ExistingP@ssw0rd!',
        city: 'Madrid',
        countryCode: 'ES',
      });
      const location = response.headers['location'];
      existingUserId = location.split('/').pop()!;
    });

    // ÉXITO: Solo status 204 NO_CONTENT
    it('Test 1 - should update all fields successfully', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'updatedUsername',
          mobilePhone: '+34600111222',
          city: 'Barcelona',
          countryCode: 'ES',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 2 - should update only username', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'newUsername123',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 3 - should update only mobile phone', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: '+34677889900',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 4 - should update only location (city and countryCode)', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          city: 'Valencia',
          countryCode: 'ES',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 7 - should update username and mobile phone combined', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'combinedUpdate',
          mobilePhone: '+34611222333',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 17 - should update with international phone (FR)', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: '+33123456789',
          city: 'Paris',
          countryCode: 'FR',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 18 - should update with international phone (UK)', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: '+447700900123',
          city: 'London',
          countryCode: 'GB',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 19 - extra fields should be rejected (forbidNonWhitelisted)', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'validUsername',
          extraField: 'should be rejected',
          anotherField: 12345,
          password: 'should not be updated',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 20 - should update with maximum length username', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'maxLength12chars',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    // ERRORES: Solo status code
    it('Test 5 - should fail when updating only city without countryCode → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          city: 'Sevilla',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 6 - should fail when updating only countryCode without city → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          countryCode: 'FR',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 8 - username too short → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'a',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 9 - username with invalid characters → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'invalid@user!',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 10 - empty username → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          username: '',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 11 - invalid mobile phone format → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: '612345678',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 12 - invalid mobile phone (letters) → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: 'invalid-phone',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 13 - invalid country code → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          city: 'Madrid',
          countryCode: 'INVALID',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 14 - country code too long → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({
          city: 'Madrid',
          countryCode: 'ESP',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 15 - no fields provided (empty body) → 400', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${existingUserId}`)
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 16 - user not found (invalid UUID) → 404', async () => {
      await request(app.getHttpServer())
        .patch('/users/00000000-0000-0000-0000-000000000000')
        .send({
          username: 'updatedUsername',
        })
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/users/login (POST)', () => {
    const username: string = 'FakeUser';
    const password: string = 'SecureP@ssw0rd';

    beforeAll(async () => {
      await request(app.getHttpServer()).post('/users').send({
        username,
        mobilePhone: '+34633310459',
        password,
        city: 'Madrid',
        countryCode: 'ES',
      });
    });

    it('Test 1 - Should return inauthorized if the user not exists', async () => {
      await request(app.getHttpServer())
        .post('/users/login')
        .send({
          username: 'NonExistentUser',
          password,
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('Test 2 - Should login successfully', async () => {
      await request(app.getHttpServer())
        .post('/users/login')
        .send({
          username,
          password,
        })
        .expect(HttpStatus.OK);
    });

    it('Test 3 - Should return Bad Request for missing password', async () => {
      await request(app.getHttpServer())
        .post('/users/login')
        .send({
          username,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 4 - Should return Bad Request for missing username', async () => {
      await request(app.getHttpServer())
        .post('/users/login')
        .send({
          password,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 5 - Should return Bad Request for empty body', async () => {
      await request(app.getHttpServer())
        .post('/users/login')
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 6 - Should return Unauthorized for wrong password', async () => {
      await request(app.getHttpServer())
        .post('/users/login')
        .send({
          username,
          password: 'Wrong@Password123',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
