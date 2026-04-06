import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';
import { INestApplication, ModuleMetadata, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import type supertest from 'supertest';
import request from 'supertest';

export class TestServerHelper {
  private app: INestApplication;
  private moduleRef: TestingModule;
  private agent: supertest.Agent | null = null;

  async create(moduleMetadata: ModuleMetadata, globalPrefix?: string): Promise<INestApplication> {
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
        name: 'connect.sid',
        cookie: {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: false,
          sameSite: 'lax',
        },
      }),
    );
    this.app.use(cookieParser());

    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    this.app.useGlobalFilters(new GlobalExceptionFilter());

    if (globalPrefix) {
      this.app.setGlobalPrefix(globalPrefix);
    }

    await this.app.init();

    return this.app;
  }
  async createWithMicroservice(
    moduleMetadata: ModuleMetadata,
    microserviceOptions: MicroserviceOptions,
    globalPrefix?: string,
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

    await this.app.startAllMicroservices();

    if (globalPrefix) {
      this.app.setGlobalPrefix(globalPrefix);
    }

    await this.app.init();

    return this.app;
  }

  getRequest(): supertest.Agent {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.agent ??= request.agent(this.app.getHttpServer());
    return this.agent;
  }

  resetAgent(): void {
    this.agent = null;
  }

  async loginAsAdmin(credentials: { email: string; password: string }): Promise<void> {
    const response = await this.getRequest().post('/api/auth/login').send(credentials);

    if (response.status !== 200) {
      throw new Error(
        `Login failed with status ${response.status}: ${JSON.stringify(response.body?.error?.message || response.body?.message || 'Unknown error')}`,
      );
    }
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
