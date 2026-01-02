import { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { DataSource } from 'typeorm';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UsersModule } from '@app/users/users.module';
import { TestServerHelper, PostgreSQLSeeder, PostgreSQLTestModule, KafkaTestModule } from '@solidarianid/testing';

describe('UsersController (e2e)', () => {
  let server!: TestServerHelper;
  let app: INestApplication;
  let seeder!: PostgreSQLSeeder;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await PostgreSQLTestModule.forRoot([UserEntity]);

    server = new TestServerHelper();
    app = await server.create({
      imports: [messageModule, databaseModule, UsersModule],
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
  });

  describe('/users (POST)', () => {
    it('Test 1 - should register new user', async () => {
      await server
        .getRequest()
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
      await server
        .getRequest()
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
      await server
        .getRequest()
        .post('/users')
        .send({
          username: 'testUsername',
          mobilePhone: '+34677889900',
          password: 'SecureP*ssw0rd123',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.CONFLICT);
    });

    it('Test 4 - username too short → 400', async () => {
      await server
        .getRequest()
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
      await server
        .getRequest()
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
      await server
        .getRequest()
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
      await server
        .getRequest()
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
      await server
        .getRequest()
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
      await server
        .getRequest()
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
      await server
        .getRequest()
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
    const existingUserId = '4807f235-f4b4-41c0-939c-c97371219551';

    // ÉXITO: Solo status 204 NO_CONTENT
    it('Test 1 - should update all fields successfully', async () => {
      await server
        .getRequest()
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
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'newUsername123',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 3 - should update only mobile phone', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: '+34677889900',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 4 - should update only location (city and countryCode)', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          city: 'Valencia',
          countryCode: 'ES',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 7 - should update username and mobile phone combined', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'combinedUpdate',
          mobilePhone: '+34611222333',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 17 - should update with international phone (FR)', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: '+33123456789',
          city: 'Paris',
          countryCode: 'FR',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 18 - should update with international phone (UK)', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: '+447700900123',
          city: 'London',
          countryCode: 'GB',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 19 - extra fields should be rejected (forbidNonWhitelisted)', async () => {
      await server
        .getRequest()
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
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'maxLength12chars',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    // ERRORES: Solo status code
    it('Test 5 - should fail when updating only city without countryCode → 400', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          city: 'Sevilla',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 6 - should fail when updating only countryCode without city → 400', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          countryCode: 'FR',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 8 - username too short → 400', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'a',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 9 - username with invalid characters → 400', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          username: 'invalid@user!',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 10 - empty username → 400', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          username: '',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 11 - invalid mobile phone format → 400', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: '612345678',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 12 - invalid mobile phone (letters) → 400', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          mobilePhone: 'invalid-phone',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 13 - invalid country code → 400', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          city: 'Madrid',
          countryCode: 'INVALID',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 14 - country code too long → 400', async () => {
      await server
        .getRequest()
        .patch(`/users/${existingUserId}`)
        .send({
          city: 'Madrid',
          countryCode: 'ESP',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 15 - no fields provided (empty body) → 400', async () => {
      await server.getRequest().patch(`/users/${existingUserId}`).send({}).expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 16 - user not found (invalid UUID) → 404', async () => {
      await server
        .getRequest()
        .patch('/users/00000000-0000-0000-0000-000000000000')
        .send({
          username: 'updatedUsername',
        })
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/users/login (POST)', () => {
    const username: string = 'testUsername';
    const password: string = 'Admin2024!Pass';

    afterAll(async () => {
      await seeder.clean();
      await seeder.seedUsers();
    });

    it('Test 1 - Should return inauthorized if the user not exists', async () => {
      await server
        .getRequest()
        .post('/users/login')
        .send({
          username: 'NonExistentUser',
          password,
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('Test 2 - Should login successfully', async () => {
      await server
        .getRequest()
        .post('/users/login')
        .send({
          username,
          password,
        })
        .expect(HttpStatus.OK);
    });

    it('Test 3 - Should return Bad Request for missing password', async () => {
      await server
        .getRequest()
        .post('/users/login')
        .send({
          username,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 4 - Should return Bad Request for missing username', async () => {
      await server
        .getRequest()
        .post('/users/login')
        .send({
          password,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 5 - Should return Bad Request for empty body', async () => {
      await server.getRequest().post('/users/login').send({}).expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 6 - Should return Unauthorized for wrong password', async () => {
      await server
        .getRequest()
        .post('/users/login')
        .send({
          username,
          password: 'Wrong@Password123',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
