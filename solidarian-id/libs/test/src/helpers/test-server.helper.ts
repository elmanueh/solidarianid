import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';
import { MicroserviceOptions } from '@nestjs/microservices';
import request from 'supertest';
import session from 'express-session';

export class TestServerHelper {
  private app: INestApplication;
  private moduleRef: TestingModule;

  async create(moduleMetadata: ModuleMetadata): Promise<INestApplication> {
    const configModule = ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'test'}`,
    });

    const enhancedMetadata: ModuleMetadata = {
      ...moduleMetadata,
      imports: [configModule, ...(moduleMetadata.imports || [])],
    };

    const builder = Test.createTestingModule(enhancedMetadata);

    this.moduleRef = await builder.compile();
    this.app = this.moduleRef.createNestApplication({
      logger: false,
    });
    this.app.use(
      session({
        secret: 'test-secret-key-for-e2e-tests',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: false,
          sameSite: 'lax',
        },
      }),
    );

    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    this.app.useGlobalFilters(new GlobalExceptionFilter());

    this.app.setGlobalPrefix('api');

    await this.app.init();
    return this.app;
  }
  async createWithMicroservice(
    moduleMetadata: ModuleMetadata,
    microserviceOptions: MicroserviceOptions,
  ): Promise<INestApplication> {
    const configModule = ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'test'}`,
    });

    const enhancedMetadata: ModuleMetadata = {
      ...moduleMetadata,
      imports: [configModule, ...(moduleMetadata.imports || [])],
    };

    this.moduleRef = await Test.createTestingModule(enhancedMetadata).compile();
    this.app = this.moduleRef.createNestApplication({
      logger: false,
    });

    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    this.app.useGlobalFilters(new GlobalExceptionFilter());

    this.app.connectMicroservice(microserviceOptions);

    this.app.setGlobalPrefix('api');

    await this.app.startAllMicroservices();
    await this.app.init();

    return this.app;
  }

  getRequest(): ReturnType<typeof request> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(this.app.getHttpServer());
  }

  async close(): Promise<void> {
    await this.app?.close();
  }

  getApp(): INestApplication {
    return this.app;
  }

  getModule(): TestingModule {
    return this.moduleRef;
  }
}
