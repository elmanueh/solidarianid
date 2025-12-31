import { INestApplication } from '@nestjs/common';
import { Connection } from 'mongoose';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { RequestsModule } from '@app/admin/administrator/model/requests.module';
import {
  MongoDBSeeder,
  MongoDBTestContainer,
  MongoDBTestModule,
  TestServerHelper,
  KafkaTestModule,
  KafkaTestContainer,
} from '@solidarianid/testing';

describe('RequestsController (e2e)', () => {
  let repository: RequestsRepositoryPort;
  const pendingRequestId = '2db201c8-5d35-462e-a1d1-985cb677725d';
  const nonExistentId = '0b5320ee-07e5-4974-8756-fb58651a6535';

  let server!: TestServerHelper;
  let app!: INestApplication;
  let seeder!: MongoDBSeeder;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await MongoDBTestModule.forRoot();
    server = new TestServerHelper();
    app = await server.create({
      imports: [messageModule, databaseModule, RequestsModule],
    });

    const connection: Connection = app.get<Connection>('Connection');
    seeder = new MongoDBSeeder(connection);
    repository = app.get<RequestsRepositoryPort>(RequestsRepositoryPort);
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedRequests();
  });

  afterAll(async () => {
    await server.close();
    await MongoDBTestContainer.getInstance().stop();
    await KafkaTestContainer.getInstance().stop();
  });

  describe('PATCH /requests/:id', () => {
    it('should approve a pending request stored in database', async () => {
      await server
        .getRequest()
        .patch(`/requests/${pendingRequestId}`)
        .send({
          status: RequestStatus.APPROVED,
          reason: 'Database test approval',
        })
        .expect(204);

      const result = await repository.findById(pendingRequestId);
      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value.status).toBe(RequestStatus.APPROVED);
      }
    });

    it('should persist rejection to database', async () => {
      await server
        .getRequest()
        .patch(`/requests/${pendingRequestId}`)
        .send({
          status: RequestStatus.REJECTED,
          reason: 'Database test rejection',
        })
        .expect(204);

      const result = await repository.findById(pendingRequestId);
      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value.status).toBe(RequestStatus.REJECTED);
        expect(result.value.reason).toBe('Database test rejection');
      }
    });

    describe('Validation Errors (400 Bad Request)', () => {
      it('should return 400 when status field is missing', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            reason: 'No status provided',
          })
          .expect(400);
      });

      it('should return 400 when status is not a valid enum value', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: 'invalid_status',
            reason: 'Testing invalid status',
          })
          .expect(400);
      });

      it('should return 400 when status is pending (not allowed for updates)', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.PENDING,
            reason: 'Trying to set pending',
          })
          .expect(400);
      });

      it('should return 400 when request body is empty', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({})
          .expect(400);
      });

      it('should return 400 when status is rejected but reason is missing', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.REJECTED,
          })
          .expect(400);
      });

      it('should return 400 when status is rejected but reason is empty string', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.REJECTED,
            reason: '',
          })
          .expect(400);
      });

      it('should return 400 when request ID is not a valid UUID', async () => {
        await server
          .getRequest()
          .patch('/requests/invalid-uuid')
          .send({
            status: RequestStatus.APPROVED,
            reason: 'Testing invalid UUID',
          })
          .expect(400);
      });
    });

    describe('Conflict Errors (409 Conflict)', () => {
      it('should return 409 when trying to approve an already approved request', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.APPROVED,
            reason: 'First approval',
          })
          .expect(204);

        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.APPROVED,
            reason: 'Second approval attempt',
          })
          .expect(409);
      });

      it('should return 409 when trying to reject an already approved request', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.APPROVED,
            reason: 'Approved',
          })
          .expect(204);

        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.REJECTED,
            reason: 'Trying to reject approved request',
          })
          .expect(409);
      });

      it('should return 409 when trying to approve an already rejected request', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.REJECTED,
            reason: 'Rejected',
          })
          .expect(204);

        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.APPROVED,
            reason: 'Trying to approve rejected request',
          })
          .expect(409);
      });

      it('should return 409 when trying to reject an already rejected request', async () => {
        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.REJECTED,
            reason: 'First rejection',
          })
          .expect(204);

        await server
          .getRequest()
          .patch(`/requests/${pendingRequestId}`)
          .send({
            status: RequestStatus.REJECTED,
            reason: 'Second rejection attempt',
          })
          .expect(409);
      });
    });

    describe('Not Found Errors (404)', () => {
      it('should return 404 when request does not exist', async () => {
        await server
          .getRequest()
          .patch(`/requests/${nonExistentId}`)
          .send({
            status: RequestStatus.APPROVED,
            reason: 'Trying to approve non-existent request',
          })
          .expect(404);
      });
    });
  });
});
