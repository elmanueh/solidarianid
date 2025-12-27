import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  ModuleMetadata,
} from '@nestjs/common';
import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';
import request from 'supertest';

export class TestServerHelper {
  private app: INestApplication;
  private moduleRef: TestingModule;

  async create(moduleMetadata: ModuleMetadata): Promise<INestApplication> {
    this.moduleRef = await Test.createTestingModule(moduleMetadata).compile();
    this.app = this.moduleRef.createNestApplication();

    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    this.app.useGlobalFilters(new GlobalExceptionFilter());

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
