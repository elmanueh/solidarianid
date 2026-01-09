/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsQueryMongooseRepository } from '@app/admin/administrator/model/infrastructure/persistence/repositories/request-query.repository-mongoose';
import { RequestsQueryRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request-query.repository.port';
import {
  RequestEntity,
  RequestSchema,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { MongoDBTestModule, MongoDBSeeder } from '@solidarianid/testing';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Connection } from 'mongoose';
import { CauseGroupByOdsData } from '@app/admin/administrator/model/application/services/data/cause-group-by-ods.data';

describe('RequestsQueryMongooseRepository (e2e)', () => {
  let app: INestApplication;
  let seeder: MongoDBSeeder;
  let repository: RequestsQueryRepositoryPort;

  beforeAll(async () => {
    const databaseModule = await MongoDBTestModule.forRoot();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [databaseModule, MongooseModule.forFeature([{ name: RequestEntity.name, schema: RequestSchema }])],
      providers: [
        {
          provide: RequestsQueryRepositoryPort,
          useClass: RequestsQueryMongooseRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const connection = app.get<Connection>('Connection');
    seeder = new MongoDBSeeder(connection);
    repository = app.get(RequestsQueryRepositoryPort);
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedRequests();
  });

  it('should group approved causes by ODS', async () => {
    const result = await repository.findCausesGroupByOds();
    expect(result.isRight()).toBe(true);
    const data = result.value as CauseGroupByOdsData[];

    expect(Array.isArray(data)).toBe(true);
    data.forEach(row => {
      expect(row).toEqual(
        expect.objectContaining({
          ods: expect.any(Number),
          causeCount: expect.any(Number),
        }),
      );
      expect(row.causeCount).toBeGreaterThan(0);
    });
  });

  it('should return left with RepositoryException on error', async () => {
    await app.close();
    const result = await repository.findCausesGroupByOds();
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RepositoryException);
  });
});
