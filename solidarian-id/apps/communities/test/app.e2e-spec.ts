import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { ConfigModule } from '@nestjs/config';
import { CommunitiesModule } from '../src/communities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityEntity } from '../src/infrastructure/persistence/entities/community.entity';

describe('CommunitiesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [CommunityEntity],
          synchronize: true,
          dropSchema: true,
        }),
        CommunitiesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer() as App)
      .get('/')
      .expect(404);
  });
});
