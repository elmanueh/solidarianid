import {
  PostgreSQLTestModule,
  TestServerHelper,
  PostgreSQLSeeder,
  KafkaTestModule,
  KafkaTestContainer,
  PostgreSQLTestContainer,
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
import { ActionSummaryResponseDto } from '@app/communities/infrastructure/presentation/dtos/output/action-summary.response.dto';
import { RequestEntity } from '@app/communities/infrastructure/persistence/entities/request.entity';

describe('ActionsController (e2e)', () => {
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
    if (app) await app.close();
    await KafkaTestContainer.getInstance().stop();
    await PostgreSQLTestContainer.getInstance().stop();
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
