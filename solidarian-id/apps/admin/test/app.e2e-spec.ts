import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import request from 'supertest';
import { Application } from 'express';
import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import { AppController } from '../src/app.controller';
import { AdminModule } from '../src/administrator/admin.module';
import { AuthModule } from '../src/auth/auth.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongoContainer: StartedTestContainer;

  // Test configuration
  const testMongoUser = 'test';
  const testMongoPassword = 'test';
  const testMongoDb = 'solidarianid-test';

  beforeAll(async () => {
    // Start MongoDB container
    mongoContainer = await new GenericContainer(
      'mongo@sha256:4b58ebcb1dc7a7b4e84cd8ce9098d48764ae4478876898ff9551acf2ac4a6a6d',
    )
      .withExposedPorts(27017)
      .withEnvironment({
        MONGO_INITDB_ROOT_USERNAME: testMongoUser,
        MONGO_INITDB_ROOT_PASSWORD: testMongoPassword,
      })
      .withWaitStrategy(Wait.forLogMessage('Waiting for connections'))
      .start();

    const host = mongoContainer.getHost();
    const port = mongoContainer.getMappedPort(27017);
    const mongoUri = `mongodb://${testMongoUser}:${testMongoPassword}@${host}:${port}/${testMongoDb}?authSource=admin`;

    // Create testing module with explicit modules instead of AppModule
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(mongoUri),
        AdminModule,
        AuthModule,
      ],
      controllers: [AppController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 60000);

  afterAll(async () => {
    await app?.close();
    await mongoContainer?.stop();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer() as Application)
      .get('/')
      .expect(302)
      .expect('Location', '/login');
  });
});
