/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UserQueryMongooseRepository } from '@app/admin/administrator/model/infrastructure/persistence/repositories/user-query.repository-mongoose';
import { UserQueryRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/user-query.repository.port';
import { UserEntity, UserSchema } from '@app/admin/administrator/model/infrastructure/persistence/entities/user.entity';
import { MongoDBTestModule, MongoDBSeeder } from '@solidarianid/testing';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Connection } from 'mongoose';
import { UserGroupByCountryData } from '@app/admin/administrator/model/application/services/user-group-by-country.data';

describe('UserQueryMongooseRepository (e2e)', () => {
  let app: INestApplication;
  let seeder: MongoDBSeeder;
  let repository: UserQueryRepositoryPort;

  beforeAll(async () => {
    const databaseModule = await MongoDBTestModule.forRoot();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [databaseModule, MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
      providers: [
        {
          provide: UserQueryRepositoryPort,
          useClass: UserQueryMongooseRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const connection = app.get<Connection>('Connection');
    seeder = new MongoDBSeeder(connection);
    repository = app.get(UserQueryRepositoryPort);
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  beforeEach(async () => {
    await seeder.clean();
    // Usar el seeder con datos por defecto que ya incluyen usuarios de diferentes países
    await seeder.seedUsers();
  });

  describe('findUsersGroupByCountry', () => {
    it('should group users by country code with correct counts', async () => {
      const result = await repository.findUsersGroupByCountry(5);
      expect(result.isRight()).toBe(true);

      const data = result.value as UserGroupByCountryData[];
      expect(Array.isArray(data)).toBe(true);

      data.forEach(row => {
        expect(row).toEqual(
          expect.objectContaining({
            country: expect.any(String),
            userCount: expect.any(Number),
          }),
        );
        expect(row.userCount).toBeGreaterThan(0);
        expect(row.country).toMatch(/^[A-Z]{2}$/);
      });
    });

    it('should respect the limit parameter', async () => {
      const limit = 2;
      const result = await repository.findUsersGroupByCountry(limit);
      expect(result.isRight()).toBe(true);

      const data = result.value as UserGroupByCountryData[];
      expect(data.length).toBeLessThanOrEqual(limit);

      if (data.length > 1) {
        for (let i = 0; i < data.length - 1; i++) {
          expect(data[i].userCount).toBeGreaterThanOrEqual(data[i + 1].userCount);
        }
      }
    });

    it('should return left with RepositoryException on limit of 0', async () => {
      const result = await repository.findUsersGroupByCountry(0);
      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
    });

    it('should return left with RepositoryException on error', async () => {
      await app.close();
      const result = await repository.findUsersGroupByCountry(5);
      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
    });
  });
});
