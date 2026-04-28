import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { ActionSummaryResponseDto } from '@app/communities/actions/infrastructure/presentation/controllers/rest/dtos/output/action-summary.response.dto';
import { CauseUserEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { CommunitiesSharedModule } from '@app/communities/shared/communities-shared.module';
import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from '@app/communities/communities/infrastructure/persistence/entities/community.entity';
import { RequestEntity } from '@app/communities/shared/infrastructure/persistence/entities/request.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { HttpStatus, INestApplication } from '@nestjs/common';
import {
  KafkaTestModule,
  PostgreSQLSeeder,
  PostgreSQLTestModule,
  TestContainerLifecycle,
  TestServerHelper,
} from '@solidarianid/testing';
import { DataSource } from 'typeorm';

describe('ActionsController (e2e)', () => {
  let server!: TestServerHelper;
  let seeder!: PostgreSQLSeeder;
  let app: INestApplication;

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
    await seeder.seedAllCommunities();
  });

  describe('/actions (GET)', () => {
    it('should return an array with all actions', async () => {
      const response = await server.getRequest().get('/api/actions').expect(HttpStatus.OK);

      expect(response.body).toHaveLength(8);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('description');
    });

    it('should return actions with correct properties', async () => {
      const response = await server.getRequest().get('/api/actions').expect(HttpStatus.OK);

      const firstAction = response.body[0] as ActionSummaryResponseDto;
      expect(firstAction.id).toBeDefined();
      expect(typeof firstAction.name).toBe('string');
      expect(typeof firstAction.description).toBe('string');
    });
  });

  describe('/actions/:id (GET)', () => {
    it('should return 400 when invalid UUID is provided', async () => {
      await server.getRequest().get('/api/actions/not-a-valid-uuid').expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when action does not exist', async () => {
      await server.getRequest().get('/api/actions/00000000-0000-0000-0000-000000000999').expect(HttpStatus.NOT_FOUND);
    });
  });
});
