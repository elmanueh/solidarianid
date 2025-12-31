import {
  PostgreSQLTestModule,
  TestServerHelper,
  PostgreSQLSeeder,
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
import { COMMUNITY_IDS } from '@solidarianid/testing';

describe('CommunitiesController (e2e)', () => {
  let server!: TestServerHelper;
  let seeder!: PostgreSQLSeeder;
  let app: INestApplication;

  beforeAll(async () => {
    const databaseModule = await PostgreSQLTestModule.forRoot([
      CommunityEntity,
      CauseEntity,
      ActionEntity,
      UserEntity,
      ObjectiveEntity,
      EventEntity,
      CommunityUserEntity,
    ]);

    server = new TestServerHelper();
    app = await server.create({
      imports: [databaseModule, CommunitiesModule],
    });

    const dataSource = app.get<DataSource>('DataSource');
    seeder = new PostgreSQLSeeder(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedAllCommunities();
  });

  describe('/communities (GET)', () => {
    it('should return an array with communities', async () => {
      const response = await server
        .getRequest()
        .get('/communities')
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(3);
      expect(response.body[0].name).toBe('Amigos por África');
    });
  });

  describe('/communities/:id (GET)', () => {
    it('should return community detail with causes', async () => {
      const response = await server
        .getRequest()
        .get(`/communities/${COMMUNITY_IDS.AFRICA}`)
        .expect(HttpStatus.OK);

      expect(response.body.name).toBe('Amigos por África');
      expect(response.body.causes).toHaveLength(2);
    });

    it('should return 400 when invalid UUID is provided', async () => {
      await server
        .getRequest()
        .get('/communities/non-existing-id')
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when community does not exist', async () => {
      await server
        .getRequest()
        .get('/communities/00000000-0000-0000-0000-000000000999')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
