/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import { Connection } from 'mongoose';
import { AdminModule } from '@app/admin/administrator/admin.module';
import {
  KafkaTestModule,
  MongoDBSeeder,
  MongoDBTestModule,
  TestContainerLifecycle,
  TestServerHelper,
} from '@solidarianid/testing';

describe('ReportsApiController (e2e)', () => {
  const existingUserId = '550e8400-e29b-41d4-a716-446655440000';
  const nonExistentUserId = '550e8400-e29b-41d4-a716-446655440099';

  let server!: TestServerHelper;
  let app!: INestApplication;
  let seeder!: MongoDBSeeder;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await MongoDBTestModule.forRoot();
    server = new TestServerHelper();
    app = await server.create({
      imports: [messageModule, databaseModule, AdminModule],
    });

    const connection: Connection = app.get<Connection>('Connection');
    seeder = new MongoDBSeeder(connection);
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedUsers();
  });

  afterAll(async () => {
    await server.close();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  describe('GET /api/reports/users/:id', () => {
    it('should return detailed user information for valid ID', async () => {
      const response = await server.getRequest().get(`/api/reports/users/${existingUserId}`).expect(200);

      expect(response.body).toHaveProperty('id', existingUserId);
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('phone');
      expect(response.body).toHaveProperty('city');
      expect(response.body).toHaveProperty('countryCode');
      expect(response.body).toHaveProperty('communities');
      expect(Array.isArray(response.body.communities)).toBe(true);
    });

    it('should include community memberships with correct structure', async () => {
      const response = await server.getRequest().get(`/api/reports/users/${existingUserId}`).expect(200);

      if (response.body.communities.length > 0) {
        const membership = response.body.communities[0];
        expect(membership).toHaveProperty('id');
        expect(membership).toHaveProperty('name');
        expect(membership).toHaveProperty('isAdmin');
      }
    });

    describe('Not Found Errors (404 Not Found)', () => {
      it('should return 404 when user does not exist', async () => {
        const response = await server.getRequest().get(`/api/reports/users/${nonExistentUserId}`).expect(404);

        expect(response.body.error).toHaveProperty('statusCode', 404);
        expect(response.body.error).toHaveProperty('message');
        expect(response.body).toHaveProperty('timestamp');
      });

      it('should return 404 with meaningful error message', async () => {
        const response = await server.getRequest().get(`/api/reports/users/${nonExistentUserId}`).expect(404);

        expect(response.body.error.message).toContain(nonExistentUserId);
      });
    });
  });

  describe('GET /api/reports/users/:id/pdf', () => {
    it('should generate and download PDF for existing user', async () => {
      const response = await server.getRequest().get(`/api/reports/users/${existingUserId}/pdf`).expect(200);

      expect(response.headers['content-type']).toBe('application/pdf');
      expect(response.headers['content-disposition']).toContain('attachment');
      expect(response.headers['content-disposition']).toContain('reporte-');
      expect(response.headers['content-disposition']).toContain('.pdf');
    });

    it('should include username in PDF filename', async () => {
      const response = await server.getRequest().get(`/api/reports/users/${existingUserId}/pdf`).expect(200);

      const contentDisposition = response.headers['content-disposition'];
      expect(contentDisposition).toMatch(/reporte-[\w-]+\.pdf/);
    });

    describe('Not Found Errors (404 Not Found)', () => {
      it('should return 404 when user does not exist', async () => {
        const response = await server.getRequest().get(`/api/reports/users/${nonExistentUserId}/pdf`).expect(404);

        expect(response.body).toHaveProperty('statusCode', 404);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('timestamp');
      });

      it('should not return PDF headers on 404 error', async () => {
        const response = await server.getRequest().get(`/api/reports/users/${nonExistentUserId}/pdf`).expect(404);

        expect(response.headers['content-type']).not.toBe('application/pdf');
      });
    });

    describe('PDF Content Validation', () => {
      it('should return valid PDF binary data', async () => {
        const response = await server.getRequest().get(`/api/reports/users/${existingUserId}/pdf`).expect(200);

        // PDF files start with %PDF-
        const pdfHeader = response.body.toString('utf8', 0, 5);
        expect(pdfHeader).toBe('%PDF-');
      });

      it('should generate unique filenames based on timestamp', async () => {
        const response1 = await server.getRequest().get(`/api/reports/users/${existingUserId}/pdf`).expect(200);

        // Small delay to ensure different timestamp
        await new Promise(resolve => setTimeout(resolve, 10));

        const response2 = await server.getRequest().get(`/api/reports/users/${existingUserId}/pdf`).expect(200);

        const filename1 = response1.headers['content-disposition'];
        const filename2 = response2.headers['content-disposition'];

        expect(filename1).not.toBe(filename2);
      });
    });
  });
});
