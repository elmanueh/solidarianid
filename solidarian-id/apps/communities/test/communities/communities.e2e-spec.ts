import {
  PostgreSQLTestModule,
  TestServerHelper,
  PostgreSQLSeeder,
  KafkaTestModule,
  PG_COMMUNITY_IDS as COMMUNITY_IDS,
  TestContainerLifecycle,
  PG_USER_IDS,
} from '@solidarianid/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CommunityEntity } from '../../src/infrastructure/persistence/entities/community.entity';
import { CauseEntity } from '../../src/infrastructure/persistence/entities/cause.entity';
import { ActionEntity } from '../../src/infrastructure/persistence/entities/action.entity';
import { UserEntity } from '../../src/infrastructure/persistence/entities/user.entity';
import { ObjectiveEntity } from '../../src/infrastructure/persistence/entities/objective.entity';
import { EventEntity } from '../../src/infrastructure/persistence/entities/event.entity';
import { EventUserEntity } from '../../src/infrastructure/persistence/entities/event-user.entity';
import { ObjetiveUserEntity } from '../../src/infrastructure/persistence/entities/objetive-user.entity';
import { CommunityUserEntity } from '../../src/infrastructure/persistence/entities/community-user.entity';
import { CommunitiesModule } from '@app/communities/communities.module';
import { RequestEntity } from '@app/communities/infrastructure/persistence/entities/request.entity';
import { CommunityRankingUserResponseDto } from '@app/communities/infrastructure/presentation/dtos/output/community-ranking-user.response.dto';

describe('CommunitiesController (e2e)', () => {
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
      EventUserEntity,
      ObjetiveUserEntity,
      CommunityUserEntity,
      RequestEntity,
    ]);

    server = new TestServerHelper();
    app = await server.create(
      {
        imports: [databaseModule, messageModule, CommunitiesModule],
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
      const newUserId = PG_USER_IDS.PEDRO;
      await server
        .getRequest()
        .post(`/api/communities/${COMMUNITY_IDS.AFRICA}/members`)
        .send({ userId: newUserId })
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
      const existingUserId = PG_USER_IDS.JUAN;
      await server
        .getRequest()
        .post(`/api/communities/${COMMUNITY_IDS.AFRICA}/members`)
        .send({ userId: existingUserId })
        .expect(HttpStatus.CONFLICT);
    });

    it('should return 400 when invalid UUID is provided for community ID', async () => {
      const newUserId = PG_USER_IDS.PEDRO;
      await server
        .getRequest()
        .post('/api/communities/invalid-uuid/members')
        .send({ idUsuario: newUserId })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when invalid UUID is provided for user ID', async () => {
      await server
        .getRequest()
        .post(`/api/communities/${COMMUNITY_IDS.AFRICA}/members`)
        .send({ idUsuario: 'invalid-uuid' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
