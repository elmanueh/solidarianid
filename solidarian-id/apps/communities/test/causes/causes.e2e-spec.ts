import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { CauseUserEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { CauseSummaryResponseDto } from '@app/communities/causes/infrastructure/presentation/controllers/rest/dtos/output/cause-summary.response.dto';
import { CommunitiesSharedModule } from '@app/communities/shared/communities-shared.module';
import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from '@app/communities/communities/infrastructure/persistence/entities/community.entity';
import { RequestEntity } from '@app/communities/shared/infrastructure/persistence/entities/request.entity';
import { SubscriptionEntity } from '@app/communities/shared/infrastructure/persistence/entities/subscription.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
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
import { DataSource, Repository } from 'typeorm';

describe('CausesController (e2e)', () => {
  let server!: TestServerHelper;
  let seeder!: PostgreSQLSeeder;
  let app: INestApplication;
  let causeUserRepository: Repository<CauseUserEntity>;

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
      SubscriptionEntity,
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
    causeUserRepository = dataSource.getRepository(CauseUserEntity);
  });

  afterAll(async () => {
    await app.close();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedAllCommunities();
  });

  describe('/api/causes (GET)', () => {
    it('should return an array with all causes', async () => {
      const response = await server.getRequest().get('/api/causes').expect(HttpStatus.OK);

      expect(response.body).toHaveLength(5);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('description');
    });

    it('should return causes with correct properties', async () => {
      const response = await server.getRequest().get('/api/causes').expect(HttpStatus.OK);

      const firstCause = response.body[0] as CauseSummaryResponseDto;
      expect(firstCause.id).toBeDefined();
      expect(typeof firstCause.name).toBe('string');
      expect(typeof firstCause.description).toBe('string');
      expect(firstCause.durationDays).toBeDefined();
      expect(firstCause.ods).toBeDefined();
    });

    it('should return causes with ODS field', async () => {
      const response = await server.getRequest().get('/api/causes').expect(HttpStatus.OK);

      expect(response.body[0].ods).toBeInstanceOf(Array);
      expect(response.body[0].ods.length).toBeGreaterThan(0);
    });
  });

  describe('/api/causes/explore (GET)', () => {
    it('should return 401 when JWT is missing', async () => {
      await server.getRequest().get('/api/causes/explore').expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/causes/:id (GET)', () => {
    it('should return cause detail by ID', async () => {
      const response = await server.getRequest().get(`/api/causes/${CAUSE_IDS.AGUA_KENIA}`).expect(HttpStatus.OK);

      expect(response.body.id).toBe(CAUSE_IDS.AGUA_KENIA);
      expect(response.body.name).toBe('Agua potable para Kenia');
      expect(response.body.description).toBe('Construcción de pozos de agua en comunidades rurales');
    });

    it('should return cause with actions', async () => {
      const response = await server.getRequest().get(`/api/causes/${CAUSE_IDS.AGUA_KENIA}`).expect(HttpStatus.OK);

      expect(response.body.actions).toBeDefined();
      expect(Array.isArray(response.body.actions)).toBe(true);
      expect(response.body.actions.length).toBeGreaterThan(0);
    });

    it('should return cause with ODS linked', async () => {
      const response = await server.getRequest().get(`/api/causes/${CAUSE_IDS.AGUA_KENIA}`).expect(HttpStatus.OK);

      expect(response.body.ods).toBeInstanceOf(Array);
      expect(response.body.ods).toContain(6); // SDG 6 - Clean water
      expect(response.body.ods).toContain(3); // SDG 3 - Good health
    });

    it('should return 400 when invalid UUID is provided', async () => {
      await server.getRequest().get('/api/causes/invalid-uuid-format').expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when cause does not exist', async () => {
      await server.getRequest().get('/api/causes/00000000-0000-0000-0000-000000000999').expect(HttpStatus.NOT_FOUND);
    });

    it('should retrieve different causes with different actions', async () => {
      const response1 = await server.getRequest().get(`/api/causes/${CAUSE_IDS.BANCO_ALIMENTOS}`).expect(HttpStatus.OK);
      const response2 = await server.getRequest().get(`/api/causes/${CAUSE_IDS.APOYO_ESCOLAR}`).expect(HttpStatus.OK);

      expect(response1.body.id).toBe(CAUSE_IDS.BANCO_ALIMENTOS);
      expect(response2.body.id).toBe(CAUSE_IDS.APOYO_ESCOLAR);
      expect(response1.body.name).not.toBe(response2.body.name);
      // Both should have actions
      expect(Array.isArray(response1.body.actions)).toBe(true);
      expect(Array.isArray(response2.body.actions)).toBe(true);
    });

    it('should return cause with correct duration days', async () => {
      const response = await server
        .getRequest()
        .get(`/api/causes/${CAUSE_IDS.ESCUELAS_TANZANIA}`)
        .expect(HttpStatus.OK);

      expect(response.body.durationDays).toBe(365);
    });
  });

  describe('/communities/:communityId/causes (GET)', () => {
    it('should return causes for a specific community', async () => {
      const response = await server
        .getRequest()
        .get(`/api/communities/${COMMUNITY_IDS.AFRICA}/causes`)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('description');
    });

    it('should return 400 when invalid UUID is provided', async () => {
      await server.getRequest().get('/api/communities/invalid-uuid/causes').expect(HttpStatus.BAD_REQUEST);
    });

    it('should return an empty array when community does not exist', async () => {
      const response = await server
        .getRequest()
        .get('/api/communities/00000000-0000-0000-0000-000000000999/causes')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual([]);
    });
  });

  describe('/communities/:communityId/causes/:causeId (GET)', () => {
    it('should return specific cause for a specific community', async () => {
      const response = await server
        .getRequest()
        .get(`/api/communities/${COMMUNITY_IDS.AFRICA}/causes/${CAUSE_IDS.AGUA_KENIA}`)
        .expect(HttpStatus.OK);

      expect(response.body.id).toBe(CAUSE_IDS.AGUA_KENIA);
      expect(response.body.name).toBe('Agua potable para Kenia');
      expect(response.body.actions).toBeDefined();
    });

    it('should return 400 when invalid UUIDs are provided', async () => {
      await server
        .getRequest()
        .get('/api/communities/invalid-uuid/causes/another-invalid-uuid')
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when cause does not exist in the community', async () => {
      await server
        .getRequest()
        .get(`/api/communities/${COMMUNITY_IDS.AFRICA}/causes/00000000-0000-0000-0000-000000000999`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/causes/:id/followers (POST)', () => {
    it('should allow a community member to follow a cause', async () => {
      const token = createAccessToken(USER_IDS.ANA);

      await server
        .getRequest()
        .post(`/api/causes/${CAUSE_IDS.AGUA_KENIA}/followers`)
        .set('Cookie', [`AccessToken=${token}`])
        .send({})
        .expect(HttpStatus.CREATED);

      const causeFollower = await causeUserRepository.findOne({
        where: {
          causeId: CAUSE_IDS.AGUA_KENIA,
          userId: USER_IDS.ANA,
        },
      });

      expect(causeFollower).toBeDefined();
      expect(causeFollower?.causeId).toBe(CAUSE_IDS.AGUA_KENIA);
      expect(causeFollower?.userId).toBe(USER_IDS.ANA);
    });

    it('should return 403 when the user is not a member of the cause community', async () => {
      const token = createAccessToken(USER_IDS.PEDRO);
      await server
        .getRequest()
        .post(`/api/causes/${CAUSE_IDS.AGUA_KENIA}/followers`)
        .set('Cookie', [`AccessToken=${token}`])
        .send({})
        .expect(HttpStatus.FORBIDDEN);

      const causeFollower = await causeUserRepository.findOne({
        where: {
          causeId: CAUSE_IDS.AGUA_KENIA,
          userId: USER_IDS.PEDRO,
        },
      });

      expect(causeFollower).toBeNull();
    });

    it('should return 409 when the user already follows the cause', async () => {
      const token = createAccessToken(USER_IDS.ANA);

      await server
        .getRequest()
        .post(`/api/causes/${CAUSE_IDS.AGUA_KENIA}/followers`)
        .set('Cookie', [`AccessToken=${token}`])
        .send({})
        .expect(HttpStatus.CREATED);

      await server
        .getRequest()
        .post(`/api/causes/${CAUSE_IDS.AGUA_KENIA}/followers`)
        .set('Cookie', [`AccessToken=${token}`])
        .send({})
        .expect(HttpStatus.CONFLICT);
    });
  });
});
