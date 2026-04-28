import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { CauseUserEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { CommunitiesSharedModule } from '@app/communities/shared/communities-shared.module';
import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from '@app/communities/communities/infrastructure/persistence/entities/community.entity';
import { RequestEntity } from '@app/communities/shared/infrastructure/persistence/entities/request.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PG_CAUSE_IDS as CAUSE_IDS,
  PG_COMMUNITY_IDS as COMMUNITY_IDS,
  KafkaTestModule,
  PostgreSQLSeeder,
  PostgreSQLTestModule,
  TestContainerLifecycle,
  TestServerHelper,
  PG_USER_IDS as USER_IDS,
} from '@solidarianid/testing';
import { DataSource } from 'typeorm';

describe('RequestController (e2e)', () => {
  let server!: TestServerHelper;
  let seeder!: PostgreSQLSeeder;
  let app: INestApplication;

  const createAccessToken = (userId: string): string => {
    const privateKey = Buffer.from(process.env.JWT_PRIVATE_KEY_BASE64 ?? '', 'base64').toString('utf8');
    const jwtService = new JwtService({ privateKey });
    return jwtService.sign({ sub: userId }, { algorithm: 'RS256', expiresIn: '15m' });
  };

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await PostgreSQLTestModule.forRoot([
      CommunityEntity,
      CauseEntity,
      CauseUserEntity,
      ActionEntity,
      UserEntity,
      ObjectiveEntity,
      EventEntity,
      EventUserEntity,
      ObjetiveUserEntity,
      CommunityUserEntity,
      RequestEntity,
    ]);

    server = new TestServerHelper();
    app = await server.create(
      {
        imports: [databaseModule, messageModule, CommunitiesSharedModule],
      },
      'api',
    );

    const dataSource = app.get<DataSource>('DataSource');
    seeder = new PostgreSQLSeeder(dataSource);
  });

  afterAll(async () => {
    await app.close();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedCommunityUsers();
    await seeder.seedCommunities();
    await seeder.seedCommunityMembers();
    await seeder.seedCauses();
  });

  describe('/community-requests (POST)', () => {
    const validCommunityRequestDto = {
      name: 'Comunidad de Prueba E2E',
      description: 'Esta es una descripción válida para la comunidad de prueba end-to-end con más de 20 caracteres',
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
      const token = createAccessToken(USER_IDS.JUAN);
      const response = await server
        .getRequest()
        .post('/api/community-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(validCommunityRequestDto)
        .expect(HttpStatus.CREATED);

      expect(response.headers.location).toBeDefined();
      expect(response.headers.location).toMatch(/\/community-requests\/[0-9a-f-]{36}$/);
    });

    it('should return 400 when name is too short', async () => {
      const token = createAccessToken(USER_IDS.JUAN);
      const invalidDto = {
        ...validCommunityRequestDto,
        name: 'ab', // Demasiado corto
      };

      await server
        .getRequest()
        .post('/api/community-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when description is too short', async () => {
      const token = createAccessToken(USER_IDS.JUAN);
      const invalidDto = {
        ...validCommunityRequestDto,
        description: 'corta', // Demasiado corta
      };

      await server
        .getRequest()
        .post('/api/community-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when causeCreationRequests is empty', async () => {
      const token = createAccessToken(USER_IDS.JUAN);
      const invalidDto = {
        ...validCommunityRequestDto,
        causeCreationRequests: [],
      };

      await server
        .getRequest()
        .post('/api/community-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when user does not exist', async () => {
      const token = createAccessToken('00000000-0000-0000-0000-000000000999');

      await server
        .getRequest()
        .post('/api/community-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(validCommunityRequestDto)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/cause-requests (POST)', () => {
    const validCauseRequestDto = {
      name: 'Causa Benéfica de Prueba E2E',
      description: 'Esta es una descripción válida para la causa benéfica end-to-end con más de 20 caracteres',
      communityId: COMMUNITY_IDS.AFRICA,
      ods: [SustainableDevelopmentGoal.ZeroHunger],
      initialDate: '2026-02-01T00:00:00.000Z',
      durationDays: 180,
    };

    it('should create a cause request and return 201 with Location header', async () => {
      const token = createAccessToken(USER_IDS.MARIA);
      const response = await server
        .getRequest()
        .post('/api/cause-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(validCauseRequestDto)
        .expect(HttpStatus.CREATED);

      expect(response.headers.location).toBeDefined();
      expect(response.headers.location).toMatch(/\/cause-requests\/[0-9a-f-]{36}$/);
    });

    it('should return 400 when name is too short', async () => {
      const token = createAccessToken(USER_IDS.MARIA);
      const invalidDto = {
        ...validCauseRequestDto,
        name: 'ab',
      };

      await server
        .getRequest()
        .post('/api/cause-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when ods is empty', async () => {
      const token = createAccessToken(USER_IDS.MARIA);
      const invalidDto = {
        ...validCauseRequestDto,
        ods: [],
      };

      await server
        .getRequest()
        .post('/api/cause-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when durationDays is less than 1', async () => {
      const token = createAccessToken(USER_IDS.MARIA);
      const invalidDto = {
        ...validCauseRequestDto,
        durationDays: 0,
      };

      await server
        .getRequest()
        .post('/api/cause-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when user does not exist', async () => {
      const token = createAccessToken('00000000-0000-0000-0000-000000000999');

      await server
        .getRequest()
        .post('/api/cause-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(validCauseRequestDto)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/action-requests (POST)', () => {
    const validActionRequestDto = {
      name: 'Acción Solidaria de Prueba E2E',
      description: 'Esta es una descripción válida para la acción solidaria end-to-end con más de 20 caracteres',
      causeId: CAUSE_IDS.AGUA_KENIA,
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
      const token = createAccessToken(USER_IDS.JUAN);
      const response = await server
        .getRequest()
        .post('/api/action-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(validActionRequestDto)
        .expect(HttpStatus.CREATED);

      expect(response.headers.location).toBeDefined();
      expect(response.headers.location).toMatch(/\/action-requests\/[0-9a-f-]{36}$/);
    });

    it('should not create an action request and return 403 if the user dont have permission', async () => {
      const token = createAccessToken(USER_IDS.PEDRO);
      const response = await server
        .getRequest()
        .post('/api/action-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(validActionRequestDto)
        .expect(HttpStatus.FORBIDDEN);

      expect(response.body).toBeDefined();
    });

    it('should return 400 when name is too short', async () => {
      const token = createAccessToken(USER_IDS.JUAN);
      const invalidDto = {
        ...validActionRequestDto,
        name: 'ab',
      };

      await server
        .getRequest()
        .post('/api/action-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when objectives is empty', async () => {
      const token = createAccessToken(USER_IDS.JUAN);
      const invalidDto = {
        ...validActionRequestDto,
        objectives: [],
      };

      await server
        .getRequest()
        .post('/api/action-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when events is empty', async () => {
      const token = createAccessToken(USER_IDS.JUAN);
      const invalidDto = {
        ...validActionRequestDto,
        events: [],
      };

      await server
        .getRequest()
        .post('/api/action-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when countryCode is invalid', async () => {
      const token = createAccessToken(USER_IDS.JUAN);
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

      await server
        .getRequest()
        .post('/api/action-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when objective quantity is less than 1', async () => {
      const token = createAccessToken(USER_IDS.JUAN);
      const invalidDto = {
        ...validActionRequestDto,
        objectives: [
          {
            ...validActionRequestDto.objectives[0],
            quantity: 0,
          },
        ],
      };

      await server
        .getRequest()
        .post('/api/action-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when user does not exist', async () => {
      const token = createAccessToken('00000000-0000-0000-0000-000000000999');

      await server
        .getRequest()
        .post('/api/action-requests')
        .set('Cookie', [`AccessToken=${token}`])
        .send(validActionRequestDto)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
