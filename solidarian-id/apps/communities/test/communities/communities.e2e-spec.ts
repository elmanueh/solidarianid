import { AppModule } from '@app/communities/app.module';
import {
  PostgreSQLTestModule,
  TestServerHelper,
  PostgreSQLTestContainer,
  PostgreSQLSeeder,
} from '@solidarianid/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CommunityEntity } from '../../src/infrastructure/persistence/entities/community.entity';
import { CauseEntity } from '../../src/infrastructure/persistence/entities/cause.entity';
import { ActionEntity } from '../../src/infrastructure/persistence/entities/action.entity';
import { UserEntity } from '../../src/infrastructure/persistence/entities/user.entity';
import { ObjetiveEntity } from '../../src/infrastructure/persistence/entities/objetive.entity';
import { EventEntity } from '../../src/infrastructure/persistence/entities/evento.entity';
import { CommunityUserEntity } from '../../src/infrastructure/persistence/entities/community-user.entity';

describe('CommunitiesController (e2e)', () => {
  let server!: TestServerHelper;
  let dataSource!: DataSource;
  let seeder!: PostgreSQLSeeder;
  let app: INestApplication;

  beforeAll(async () => {
    const databaseModule = await PostgreSQLTestModule.forRoot([
      CommunityEntity,
      CauseEntity,
      ActionEntity,
      UserEntity,
      ObjetiveEntity,
      EventEntity,
      CommunityUserEntity,
    ]);

    server = new TestServerHelper();
    app = await server.create({
      imports: [databaseModule, AppModule],
    });

    dataSource = app.get<DataSource>('DataSource');
    seeder = new PostgreSQLSeeder(dataSource);
  });

  afterAll(async () => {
    await app.close();
    await PostgreSQLTestContainer.getInstance().stop();
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
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0].name).toBe('Amigos por África');
    });
  });

  describe('/communities/:id (GET)', () => {
    it('should return community detail with causes', async () => {
      const response = await server
        .getRequest()
        .get('/communities/b1b2c3d4-e5f6-7890-abcd-ef1234567001')
        .expect(200);

      expect(response.body.name).toBe('Amigos por África');
      expect(response.body.causes).toHaveLength(2);
    });
  });
});
