import { CheckpointProjectionEntity } from '@app/users/infrastructure/persistence/projections/checkpoint.projection.entity';
import { UserProjectionEntity } from '@app/users/infrastructure/persistence/projections/user.projection.entity';
import { UsersModule } from '@app/users/users.module';
import { KurrentDBClient } from '@kurrent/kurrentdb-client';
import { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
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

async function resetState(kurrentdbSeeder: KurrentDBSeeder, postgresSeeder: PostgreSQLSeeder): Promise<void> {
  const projectionUserIds = await postgresSeeder.getUserProjectionIds();
  await kurrentdbSeeder.clean(projectionUserIds);
  await kurrentdbSeeder.seedUsers();
  await postgresSeeder.clean();
  await postgresSeeder.seedUsersProjection();
}

describe('UsersController (e2e)', () => {
  let server!: TestServerHelper;
  let app: INestApplication;
  let kurrentdbSeeder!: KurrentDBSeeder;
  let postgreSeeder!: PostgreSQLSeeder;
  let eventStore!: KurrentDBClient;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await PostgreSQLTestModule.forRoot([UserProjectionEntity, CheckpointProjectionEntity]);
    const kurrentdbModule = await KurrentDBTestModule.forRoot();

    const connectionString = process.env.EVENT_STORE_URL!;
    eventStore = KurrentDBClient.connectionString(connectionString);
    kurrentdbSeeder = new KurrentDBSeeder(eventStore);

    server = new TestServerHelper();
    app = await server.create({
      imports: [messageModule, databaseModule, kurrentdbModule, UsersModule],
    });

    postgreSeeder = new PostgreSQLSeeder(app.get<DataSource>('DataSource'));

    await resetState(kurrentdbSeeder, postgreSeeder);
  });

  afterAll(async () => {
    await app.close();
    await eventStore.dispose();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  describe('/api/users (POST)', () => {
    beforeEach(async () => {
      await resetState(kurrentdbSeeder, postgreSeeder);
    });

    it('Test 1 - should register new user', async () => {
      await server
        .getRequest()
        .post('/api/users')
        .send({
          fullName: 'John Doe Smith',
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
        .post('/api/users')
        .send({
          fullName: 'Jane Smith Williams',
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
        .post('/api/users')
        .send({
          fullName: 'Test User Duplicate',
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
        .post('/api/users')
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
        .post('/api/users')
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
        .post('/api/users')
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
        .post('/api/users')
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
        .post('/api/users')
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
        .post('/api/users')
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
        .post('/api/users')
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

  describe('/api/users/:id (PATCH)', () => {
    const existingUserId = '4807f235-f4b4-41c0-939c-c97371219551';

    beforeEach(async () => {
      await resetState(kurrentdbSeeder, postgreSeeder);
    });

    // ÉXITO: Solo status 204 NO_CONTENT
    it('Test 1 - should update all fields successfully', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
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
        .patch(`/api/users/${existingUserId}`)
        .send({
          username: 'newUsername123',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 3 - should update only mobile phone', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          mobilePhone: '+34677889900',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 4 - should update only location (city and countryCode)', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          city: 'Valencia',
          countryCode: 'ES',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 7 - should update username and mobile phone combined', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          username: 'combinedUpdate',
          mobilePhone: '+34611222333',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 17 - should update with international phone (FR)', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
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
        .patch(`/api/users/${existingUserId}`)
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
        .patch(`/api/users/${existingUserId}`)
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
        .patch(`/api/users/${existingUserId}`)
        .send({
          username: 'maxLength12chars',
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    // ERRORES: Solo status code
    it('Test 5 - should fail when updating only city without countryCode → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          city: 'Sevilla',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 6 - should fail when updating only countryCode without city → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          countryCode: 'FR',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 8 - username too short → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          username: 'a',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 9 - username with invalid characters → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          username: 'invalid@user!',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 10 - empty username → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          username: '',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 11 - invalid mobile phone format → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          mobilePhone: '612345678',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 12 - invalid mobile phone (letters) → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          mobilePhone: 'invalid-phone',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 13 - invalid country code → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          city: 'Madrid',
          countryCode: 'INVALID',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 14 - country code too long → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}`)
        .send({
          city: 'Madrid',
          countryCode: 'ESP',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 15 - no fields provided (empty body) → 400', async () => {
      await server.getRequest().patch(`/api/users/${existingUserId}`).send({}).expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 16 - user not found (invalid UUID) → 404', async () => {
      await server
        .getRequest()
        .patch('/api/users/00000000-0000-0000-0000-000000000000')
        .send({
          username: 'updatedUsername',
        })
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/api/users/:id/preferences (GET)', () => {
    const existingUserId = '4807f235-f4b4-41c0-939c-c97371219551';

    it('Test 1 - should get user preferences successfully', async () => {
      const response = await server.getRequest().get(`/api/users/${existingUserId}/preferences`).expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('preferredSDGs');
      expect(response.body).toHaveProperty('preferredCategories');
      expect(response.body).toHaveProperty('durationPreferences');
      expect(response.body).toHaveProperty('notificationsEnabled');
      expect(Array.isArray(response.body.preferredSDGs)).toBe(true);
      expect(Array.isArray(response.body.preferredCategories)).toBe(true);
      expect(Array.isArray(response.body.durationPreferences)).toBe(true);
      expect(typeof response.body.notificationsEnabled).toBe('boolean');
    });

    it('Test 2 - should return 404 for non-existent user', async () => {
      await server
        .getRequest()
        .get('/api/users/00000000-0000-0000-0000-000000000000/preferences')
        .expect(HttpStatus.NOT_FOUND);
    });

    it('Test 3 - should return 400 for invalid user ID format', async () => {
      await server.getRequest().get('/api/users/invalid-uuid/preferences').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/api/users/:id/preferences (PUT)', () => {
    const existingUserId = '4807f235-f4b4-41c0-939c-c97371219551';

    beforeEach(async () => {
      await resetState(kurrentdbSeeder, postgreSeeder);
    });

    it('Test 1 - should update all preferences successfully', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredSDGs: [1, 2, 4, 10],
          preferredCategories: ['pobreza', 'educación', 'salud'],
          durationPreferences: ['short_term', 'medium_term'],
          notificationsEnabled: true,
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 2 - should update only SDGs', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredSDGs: [3, 7, 13],
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 3 - should update only categories', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredCategories: ['medio ambiente', 'derechos humanos'],
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 4 - should update only duration preferences', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          durationPreferences: ['long_term'],
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 5 - should update only notifications flag', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          notificationsEnabled: false,
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 6 - should update with all 17 SDGs (maximum allowed)', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredSDGs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 7 - should update with 10 categories (maximum allowed)', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredCategories: [
            'pobreza',
            'educación',
            'salud',
            'medio ambiente',
            'derechos humanos',
            'infancia',
            'igualdad de género',
            'discapacidad',
            'refugiados',
            'ayuda humanitaria',
          ],
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 8 - should update with all duration preferences', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          durationPreferences: ['short_term', 'medium_term', 'long_term', 'any'],
        })
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Test 9 - should fail with more than 17 SDGs → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredSDGs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 10 - should fail with invalid SDG number → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredSDGs: [0, 2, 4],
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 11 - should fail with SDG out of range → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredSDGs: [1, 2, 20],
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 12 - should fail with more than 10 categories → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredCategories: [
            'pobreza',
            'educación',
            'salud',
            'medio ambiente',
            'derechos humanos',
            'infancia',
            'igualdad de género',
            'discapacidad',
            'refugiados',
            'ayuda humanitaria',
            'cultura',
          ],
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 13 - should fail with invalid category value → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredCategories: ['invalid_category', 'educación'],
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 14 - should fail with invalid duration preference → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          durationPreferences: ['invalid_duration'],
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 15 - should fail with empty arrays when required → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredSDGs: [],
          preferredCategories: [],
          durationPreferences: [],
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 16 - should fail with non-array values → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredSDGs: 'not-an-array',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 17 - should fail with invalid boolean for notifications → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          notificationsEnabled: 'yes',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 18 - should fail for non-existent user → 404', async () => {
      await server
        .getRequest()
        .patch('/api/users/00000000-0000-0000-0000-000000000000/preferences')
        .send({
          preferredSDGs: [1, 2],
          preferredCategories: ['educación'],
          durationPreferences: ['short_term'],
          notificationsEnabled: true,
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('Test 19 - should fail with extra fields (forbidNonWhitelisted) → 400', async () => {
      await server
        .getRequest()
        .patch(`/api/users/${existingUserId}/preferences`)
        .send({
          preferredSDGs: [1, 2],
          preferredCategories: ['educación'],
          durationPreferences: ['short_term'],
          notificationsEnabled: true,
          extraField: 'should be rejected',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
