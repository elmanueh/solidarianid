import { INestApplication } from '@nestjs/common';
import { Connection } from 'mongoose';
import {
  KafkaTestModule,
  MongoDBSeeder,
  MongoDBTestModule,
  TestContainerLifecycle,
  TestServerHelper,
} from '@solidarianid/testing';
import { AdminModule } from '@app/admin/administrator/admin.module';
import { UserGroupByCountryResponseDto } from '@app/admin/administrator/controllers/dtos/user-group-by-country.response.dto';
import { CauseGroupByOdsResponseDto } from '@app/admin/administrator/controllers/dtos/cause-group-by-ods.response.dto';

describe('MetricsApiController (e2e)', () => {
  let server!: TestServerHelper;
  let app!: INestApplication;
  let seeder!: MongoDBSeeder;

  beforeAll(async () => {
    const databaseModule = await MongoDBTestModule.forRoot();
    const messageModule = await KafkaTestModule.forRoot();
    server = new TestServerHelper();
    app = await server.create({
      imports: [databaseModule, AdminModule, messageModule],
    });

    const connection: Connection = app.get<Connection>('Connection');
    seeder = new MongoDBSeeder(connection);
  });

  afterAll(async () => {
    await server.close();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedAll();
  });

  describe('GET /api/metrics/users-by-country', () => {
    it('should return users grouped by country with default limit', async () => {
      const response = await server.getRequest().get('/api/metrics/users-by-country').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      response.body.forEach((item: UserGroupByCountryResponseDto) => {
        expect(item).toHaveProperty('country');
        expect(item).toHaveProperty('userCount');
        expect(typeof item.country).toBe('string');
        expect(typeof item.userCount).toBe('number');
        expect(item.userCount).toBeGreaterThan(0);
      });

      const firstItem = response.body[0] as UserGroupByCountryResponseDto;
      expect(firstItem.country).toBe('ES'); // Should be Spain with most users
    });

    it('should return users grouped by country with custom limit', async () => {
      const limit = 2;
      const response = await server.getRequest().get(`/api/metrics/users-by-country?limit=${limit}`).expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(limit);
    });

    it('should return 500 for limit of 0', async () => {
      await server.getRequest().get('/api/metrics/users-by-country?limit=0').expect(500);
    });

    it('should handle limit greater than available data', async () => {
      const response = await server.getRequest().get('/api/metrics/users-by-country?limit=100').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // Deberíamos tener exactamente 3 países (ES, FR, PT)
      expect(response.body.length).toBe(3);
    });

    it('should return 400 for invalid limit parameter', async () => {
      await server.getRequest().get('/api/metrics/users-by-country?limit=invalid').expect(400);
    });
  });

  describe('GET /api/metrics/causes-by-ods', () => {
    it('should return causes grouped by ODS', async () => {
      const response = await server.getRequest().get('/api/metrics/causes-by-ods').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      response.body.forEach((item: CauseGroupByOdsResponseDto) => {
        expect(item).toHaveProperty('ods');
        expect(item).toHaveProperty('causeCount');
        expect(typeof item.ods).toBe('number');
        expect(typeof item.causeCount).toBe('number');
        expect(item.causeCount).toBeGreaterThan(0);
        expect(item.ods).toBeGreaterThanOrEqual(1);
        expect(item.ods).toBeLessThanOrEqual(17);
      });
    });

    it('should only return approved causes', async () => {
      const response = await server.getRequest().get('/api/metrics/causes-by-ods').expect(200);

      expect(response.body.length).toBeGreaterThan(0);
      const data = response.body as CauseGroupByOdsResponseDto[];

      const ods3Data = data.find((item: CauseGroupByOdsResponseDto) => item.ods === 3);
      expect(ods3Data).toBeUndefined();
    });

    it('should return empty array when no approved causes exist', async () => {
      await seeder.clean();

      const response = await server.getRequest().get('/api/metrics/causes-by-ods').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('should handle database connection issues gracefully', async () => {
      await app.get<Connection>('Connection').close();

      const response = await server.getRequest().get('/api/metrics/causes-by-ods').expect(500);

      expect(response.body).toHaveProperty('error');
    });
  });
});
