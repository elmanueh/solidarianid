// test/users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { App } from 'supertest/types';
import { UsersModule } from '@app/users/users.module';
import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (POST)', () => {
    // ÉXITO: Solo status + Location
    it('Test 1 - should register new user', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'johnDoe',
          mobilePhone: '+34612345678',
          password: 'SecureP*ssw0rd123',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.CREATED)
        .expect('Location', /\S+/); // Solo verifica que existe
    });

    it('Test 2 - international phone US', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'janeSmith',
          mobilePhone: '+15551234567',
          password: 'ValidPassword789!',
          city: 'New York',
          countryCode: 'US',
        })
        .expect(HttpStatus.CREATED)
        .expect('Location', /\S+/);
    });

    // ERRORES: Solo status code
    it('Test 3 - duplicate username → 409', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'johnDoe',
          mobilePhone: '+34677889900',
          password: 'SecureP*ssw0rd123',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.CONFLICT);
    });

    it('Test 4 - username too short → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'a',
          mobilePhone: '+34612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 5 - password too short → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          mobilePhone: '+34612345678',
          password: '123',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 6 - invalid country code → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          mobilePhone: '+34612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'XX',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 7 - missing mobilePhone → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 8 - empty username → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: '',
          mobilePhone: '+34612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 9 - invalid phone → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          mobilePhone: '612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Test 10 - extra fields → 400', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'test',
          mobilePhone: '+34612345678',
          password: 'test',
          city: 'Madrid',
          countryCode: 'ES',
          extra: 'field',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
