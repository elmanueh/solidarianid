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
import { CommunityRankingUserResponseDto } from '@app/communities/communities/infrastructure/presentation/controllers/rest/dtos/output/community-ranking-user.response.dto';
import { RequestEntity } from '@app/communities/shared/infrastructure/persistence/entities/request.entity';
import { SubscriptionEntity } from '@app/communities/shared/infrastructure/persistence/entities/subscription.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PG_COMMUNITY_IDS as COMMUNITY_IDS,
  KafkaTestModule,
  PG_USER_IDS,
  PostgreSQLSeeder,
  PostgreSQLTestModule,
  TestContainerLifecycle,
  TestServerHelper,
} from '@solidarianid/testing';
import { DataSource } from 'typeorm';

describe('CommunitiesController (e2e)', () => {
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
      SubscriptionEntity,
    ]);

    server = new TestServerHelper();
    app = await server.create(
      {
        imports: [databaseModule, messageModule, CommunitiesSharedModule],
        providers: [],
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
    await seeder.seedAllCommunities();
  });

  describe('/communities (GET)', () => {
    it('should return an array with communities', async () => {
      const response = await server.getRequest().get('/api/communities').expect(HttpStatus.OK);

      expect(response.body).toHaveLength(3);
      expect(response.body[0].name).toBe('Amigos por África');
    });

    it('should return communities without criteria parameter', async () => {
      const response = await server.getRequest().get('/api/communities').expect(HttpStatus.OK);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('description');
    });
  });

  describe('/communities/explore (GET)', () => {
    it('should return 401 when JWT is missing', async () => {
      await server.getRequest().get('/api/communities/explore').expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/communities/:id (GET)', () => {
    it('should return community detail with causes', async () => {
      const response = await server.getRequest().get(`/api/communities/${COMMUNITY_IDS.AFRICA}`).expect(HttpStatus.OK);

      expect(response.body.name).toBe('Amigos por África');
      expect(response.body.causes).toHaveLength(2);
    });

    it('should return 400 when invalid UUID is provided', async () => {
      await server.getRequest().get('/api/communities/non-existing-id').expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when community does not exist', async () => {
      await server
        .getRequest()
        .get('/api/communities/00000000-0000-0000-0000-000000000999')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/communities?criteria=most-users (GET)', () => {
    it('should return communities ordered by number of users desc', async () => {
      const response = await server.getRequest().get('/api/communities?criteria=most-users').expect(HttpStatus.OK);

      expect(response.body).toHaveLength(Object.keys(COMMUNITY_IDS).length);
      expect(response.body[0].name).toBe('Voluntarios Sin Fronteras Madrid');
      expect(response.body[0].userCount).toBe(3);
      expect(response.body[1].name).toBe('Amigos por África');
      expect(response.body[1].userCount).toBe(3);
    });

    it('should return limited communities when limit query param is provided', async () => {
      const response = await server
        .getRequest()
        .get('/api/communities?criteria=most-users&limit=1')
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe('Voluntarios Sin Fronteras Madrid');
      expect(response.body[0].userCount).toBe(3);
    });

    it('should return 400 when limit query param is invalid', async () => {
      await server
        .getRequest()
        .get('/api/communities?criteria=most-users&limit=invalid')
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/communities/:id/users (GET)', () => {
    it('should return monthly joined users data for a community', async () => {
      const response = await server
        .getRequest()
        .get(`/api/communities/${COMMUNITY_IDS.AFRICA}/users?months=2`)
        .expect(HttpStatus.OK);

      expect(response.body.communityName).toBe('Amigos por África');
      expect(response.body.dataRange).toHaveLength(2);
    });

    it('should return 400 when invalid UUID is provided', async () => {
      await server.getRequest().get('/api/communities/invalid-uuid/users').expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when months query param is invalid', async () => {
      await server
        .getRequest()
        .get(`/api/communities/${COMMUNITY_IDS.AFRICA}/users?months=invalid`)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/communities/:id/members (POST)', () => {
    it('should allow a user to join a community', async () => {
      const token = createAccessToken(PG_USER_IDS.PEDRO);
      await server
        .getRequest()
        .post(`/api/communities/${COMMUNITY_IDS.AFRICA}/members`)
        .set('Cookie', [`AccessToken=${token}`])
        .send({})
        .expect(HttpStatus.CREATED);

      await server
        .getRequest()
        .get(`/api/communities?criteria=most-users`)
        .expect(HttpStatus.OK)
        .then(response => {
          const community = (response.body as CommunityRankingUserResponseDto[]).find(
            (c: CommunityRankingUserResponseDto) => c.id === COMMUNITY_IDS.AFRICA,
          );
          expect(community?.userCount).toBe(4);
        });
    });

    it('should return 409 when user is already a member of the community', async () => {
      const token = createAccessToken(PG_USER_IDS.JUAN);
      await server
        .getRequest()
        .post(`/api/communities/${COMMUNITY_IDS.AFRICA}/members`)
        .set('Cookie', [`AccessToken=${token}`])
        .send({})
        .expect(HttpStatus.CONFLICT);
    });

    it('should return 400 when invalid UUID is provided for community ID', async () => {
      const token = createAccessToken(PG_USER_IDS.PEDRO);
      await server
        .getRequest()
        .post('/api/communities/invalid-uuid/members')
        .set('Cookie', [`AccessToken=${token}`])
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 401 when JWT is missing in protected endpoint', async () => {
      await server
        .getRequest()
        .post(`/api/communities/${COMMUNITY_IDS.AFRICA}/members`)
        .send({})
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
