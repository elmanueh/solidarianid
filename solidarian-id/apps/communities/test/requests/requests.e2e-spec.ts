import {
  PostgreSQLTestModule,
  TestServerHelper,
  PostgreSQLSeeder,
  KafkaTestModule,
  KafkaTestContainer,
  PostgreSQLTestContainer,
  USER_IDS,
} from '@solidarianid/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CommunityEntity } from '../../src/infrastructure/persistence/entities/community.entity';
import { CauseEntity } from '../../src/infrastructure/persistence/entities/cause.entity';
import { ActionEntity } from '../../src/infrastructure/persistence/entities/action.entity';
import { UserEntity } from '../../src/infrastructure/persistence/entities/user.entity';
import { ObjectiveEntity } from '../../src/infrastructure/persistence/entities/objective.entity';
import { EventEntity } from '../../src/infrastructure/persistence/entities/event.entity';
import { CommunityUserEntity } from '../../src/infrastructure/persistence/entities/community-user.entity';
import { CommunitiesModule } from '@app/communities/communities.module';
import { RequestEntity } from '@app/communities/infrastructure/persistence/entities/request.entity';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

describe('RequestController (e2e)', () => {
  let server!: TestServerHelper;
  let seeder!: PostgreSQLSeeder;
  let app: INestApplication;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await PostgreSQLTestModule.forRoot([
      CommunityEntity,
      CauseEntity,
      ActionEntity,
      UserEntity,
      ObjectiveEntity,
      EventEntity,
      CommunityUserEntity,
      RequestEntity,
    ]);

    server = new TestServerHelper();
    app = await server.create({
      imports: [databaseModule, messageModule, CommunitiesModule],
    });

    const dataSource = app.get<DataSource>('DataSource');
    seeder = new PostgreSQLSeeder(dataSource);
  });

  afterAll(async () => {
    if (app) await app.close();
    await KafkaTestContainer.getInstance().stop();
    await PostgreSQLTestContainer.getInstance().stop();
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedCommunityUsers();
  });

  describe('/community-requests (POST)', () => {
    const validCommunityRequestDto = {
      name: 'Comunidad de Prueba E2E',
      description: 'Esta es una descripción válida para la comunidad de prueba end-to-end con más de 20 caracteres',
      userId: USER_IDS.JUAN,
      causeCreationRequests: [
        {
          name: 'Causa de Prueba E2E',
          description: 'Descripción válida de la causa para pruebas end-to-end con más de 20 caracteres',
          ods: [SustainableDevelopmentGoal.NoPoverty],
          initialDate: '2026-01-15T00:00:00.000Z',
          durationDays: 90,
        },
      ],
    };

    it('should create a community request and return 201 with Location header', async () => {
      const response = await server
        .getRequest()
        .post('/community-requests')
        .send(validCommunityRequestDto)
        .expect(HttpStatus.CREATED);

      expect(response.headers.location).toBeDefined();
      expect(response.headers.location).toMatch(/\/community-requests\/[0-9a-f-]{36}$/);
    });

    it('should return 400 when name is too short', async () => {
      const invalidDto = {
        ...validCommunityRequestDto,
        name: 'ab', // Demasiado corto
      };

      await server.getRequest().post('/community-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when description is too short', async () => {
      const invalidDto = {
        ...validCommunityRequestDto,
        description: 'corta', // Demasiado corta
      };

      await server.getRequest().post('/community-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when causeCreationRequests is empty', async () => {
      const invalidDto = {
        ...validCommunityRequestDto,
        causeCreationRequests: [],
      };

      await server.getRequest().post('/community-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when user does not exist', async () => {
      const invalidDto = {
        ...validCommunityRequestDto,
        userId: '00000000-0000-0000-0000-000000000999', // Usuario inexistente
      };

      await server.getRequest().post('/community-requests').send(invalidDto).expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/cause-requests (POST)', () => {
    const validCauseRequestDto = {
      name: 'Causa Benéfica de Prueba E2E',
      description: 'Esta es una descripción válida para la causa benéfica end-to-end con más de 20 caracteres',
      userId: USER_IDS.MARIA,
      ods: [SustainableDevelopmentGoal.ZeroHunger],
      initialDate: '2026-02-01T00:00:00.000Z',
      durationDays: 180,
    };

    it('should create a cause request and return 201 with Location header', async () => {
      const response = await server
        .getRequest()
        .post('/cause-requests')
        .send(validCauseRequestDto)
        .expect(HttpStatus.CREATED);

      expect(response.headers.location).toBeDefined();
      expect(response.headers.location).toMatch(/\/cause-requests\/[0-9a-f-]{36}$/);
    });

    it('should return 400 when name is too short', async () => {
      const invalidDto = {
        ...validCauseRequestDto,
        name: 'ab',
      };

      await server.getRequest().post('/cause-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when ods is empty', async () => {
      const invalidDto = {
        ...validCauseRequestDto,
        ods: [],
      };

      await server.getRequest().post('/cause-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when durationDays is less than 1', async () => {
      const invalidDto = {
        ...validCauseRequestDto,
        durationDays: 0,
      };

      await server.getRequest().post('/cause-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when user does not exist', async () => {
      const invalidDto = {
        ...validCauseRequestDto,
        userId: '00000000-0000-0000-0000-000000000999',
      };

      await server.getRequest().post('/cause-requests').send(invalidDto).expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/action-requests (POST)', () => {
    const validActionRequestDto = {
      name: 'Acción Solidaria de Prueba E2E',
      description: 'Esta es una descripción válida para la acción solidaria end-to-end con más de 20 caracteres',
      userId: USER_IDS.PEDRO,
      objectives: [
        {
          name: 'Objetivo de Prueba E2E',
          description: 'Descripción del objetivo cuantificable con más de 20 caracteres',
          quantity: 100,
          unit: 'kilogramos',
        },
      ],
      events: [
        {
          name: 'Evento de Prueba E2E',
          description: 'Descripción del evento presencial con más de 20 caracteres',
          initialDate: '2026-03-15T10:00:00.000Z',
          place: {
            direction: 'Calle Mayor 123',
            city: 'Madrid',
            countryCode: 'ES',
          },
        },
      ],
    };

    it('should create an action request and return 201 with Location header', async () => {
      const response = await server
        .getRequest()
        .post('/action-requests')
        .send(validActionRequestDto)
        .expect(HttpStatus.CREATED);

      expect(response.headers.location).toBeDefined();
      expect(response.headers.location).toMatch(/\/action-requests\/[0-9a-f-]{36}$/);
    });

    it('should return 400 when name is too short', async () => {
      const invalidDto = {
        ...validActionRequestDto,
        name: 'ab',
      };

      await server.getRequest().post('/action-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when objectives is empty', async () => {
      const invalidDto = {
        ...validActionRequestDto,
        objectives: [],
      };

      await server.getRequest().post('/action-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when events is empty', async () => {
      const invalidDto = {
        ...validActionRequestDto,
        events: [],
      };

      await server.getRequest().post('/action-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when countryCode is invalid', async () => {
      const invalidDto = {
        ...validActionRequestDto,
        events: [
          {
            ...validActionRequestDto.events[0],
            place: {
              direction: 'Calle Mayor 123',
              city: 'Madrid',
              countryCode: 'ESPAÑA', // Código inválido (debe ser 2 letras)
            },
          },
        ],
      };

      await server.getRequest().post('/action-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when objective quantity is less than 1', async () => {
      const invalidDto = {
        ...validActionRequestDto,
        objectives: [
          {
            ...validActionRequestDto.objectives[0],
            quantity: 0,
          },
        ],
      };

      await server.getRequest().post('/action-requests').send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when user does not exist', async () => {
      const invalidDto = {
        ...validActionRequestDto,
        userId: '00000000-0000-0000-0000-000000000999',
      };

      await server.getRequest().post('/action-requests').send(invalidDto).expect(HttpStatus.NOT_FOUND);
    });
  });
});
