import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  ModuleMetadata,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';
import request from 'supertest';

export class TestServerHelper {
  private app: INestApplication;
  private moduleRef: TestingModule;

  async create(
    moduleMetadata: ModuleMetadata,
    beforeInit?: (app: INestApplication) => void,
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
    this.app = this.moduleRef.createNestApplication();

    if (beforeInit) {
      beforeInit(this.app);
    }

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
