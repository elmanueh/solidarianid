import {
  PostgreSQLTestModule,
  TestServerHelper,
  PostgreSQLSeeder,
  KafkaTestModule,
  PG_COMMUNITY_IDS as COMMUNITY_IDS,
  TestContainerLifecycle,
} from '@solidarianid/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CommunityEntity } from '../../src/infrastructure/persistence/entities/community.entity';
import { CauseEntity } from '../../src/infrastructure/persistence/entities/cause.entity';
import { ActionEntity } from '../../src/infrastructure/persistence/entities/action.entity';
import { UserEntity } from '../../src/infrastructure/persistence/entities/user.entity';
import { ObjectiveEntity } from '../../src/infrastructure/persistence/entities/objective.entity';
import { EventEntity } from '../../src/infrastructure/persistence/entities/event.entity';
import { EventUserEntity } from '../../src/infrastructure/persistence/entities/event-user';
import { ObjetiveUserEntity } from '../../src/infrastructure/persistence/entities/objetive-user';
import { CommunityUserEntity } from '../../src/infrastructure/persistence/entities/community-user.entity';
import { CommunitiesModule } from '@app/communities/communities.module';
import { RequestEntity } from '@app/communities/infrastructure/persistence/entities/request.entity';

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

  describe('/communities/ranking/most-users (GET)', () => {
    it('should return communities ordered by number of users desc', async () => {
      const response = await server.getRequest().get('/api/communities/ranking/most-users').expect(HttpStatus.OK);

      expect(response.body).toHaveLength(Object.keys(COMMUNITY_IDS).length);
      expect(response.body[0].name).toBe('Voluntarios Sin Fronteras Madrid');
      expect(response.body[0].userCount).toBe(3);
      expect(response.body[1].name).toBe('Amigos por África');
      expect(response.body[1].userCount).toBe(3);
    });

    it('should return limited communities when limit query param is provided', async () => {
      const response = await server
        .getRequest()
        .get('/api/communities/ranking/most-users?limit=1')
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe('Voluntarios Sin Fronteras Madrid');
      expect(response.body[0].userCount).toBe(3);
    });

    it('should return 400 when limit query param is invalid', async () => {
      await server.getRequest().get('/api/communities/ranking/most-users?limit=invalid').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/communities/:id/users-joined (GET)', () => {
    it('should return monthly joined users data for a community', async () => {
      const response = await server
        .getRequest()
        .get(`/api/communities/${COMMUNITY_IDS.AFRICA}/users-joined?months=2`)
        .expect(HttpStatus.OK);

      expect(response.body.communityName).toBe('Amigos por África');
      expect(response.body.dataRange).toHaveLength(2);
    });

    it('should return 400 when invalid UUID is provided', async () => {
      await server.getRequest().get('/api/communities/invalid-uuid/users-joined').expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when months query param is invalid', async () => {
      await server
        .getRequest()
        .get(`/api/communities/${COMMUNITY_IDS.AFRICA}/users-joined?months=invalid`)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
