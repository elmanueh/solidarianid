import {
  PostgreSQLTestModule,
  TestServerHelper,
  PostgreSQLSeeder,
  CAUSE_IDS,
  KafkaTestModule,
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
import { CauseSummaryResponseDto } from '@app/communities/infrastructure/presentation/dtos/output/cause-summary.response.dto';
import { RequestEntity } from '@app/communities/infrastructure/persistence/entities/request.entity';

describe('CausesController (e2e)', () => {
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
    app = await server.create({
      imports: [databaseModule, messageModule, CommunitiesModule],
    });

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

  describe('/causes (GET)', () => {
    it('should return an array with all causes', async () => {
      const response = await server.getRequest().get('/causes').expect(HttpStatus.OK);

      expect(response.body).toHaveLength(5);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('description');
    });

    it('should return causes with correct properties', async () => {
      const response = await server.getRequest().get('/causes').expect(HttpStatus.OK);

      const firstCause = response.body[0] as CauseSummaryResponseDto;
      expect(firstCause.id).toBeDefined();
      expect(typeof firstCause.name).toBe('string');
      expect(typeof firstCause.description).toBe('string');
      expect(firstCause.durationDays).toBeDefined();
      expect(firstCause.ods).toBeDefined();
    });

    it('should return causes with ODS field', async () => {
      const response = await server.getRequest().get('/causes').expect(HttpStatus.OK);

      expect(response.body[0].ods).toBeInstanceOf(Array);
      expect(response.body[0].ods.length).toBeGreaterThan(0);
    });
  });

  describe('/causes/:id (GET)', () => {
    it('should return cause detail by ID', async () => {
      const response = await server.getRequest().get(`/causes/${CAUSE_IDS.AGUA_KENIA}`).expect(HttpStatus.OK);

      expect(response.body.id).toBe(CAUSE_IDS.AGUA_KENIA);
      expect(response.body.name).toBe('Agua potable para Kenia');
      expect(response.body.description).toBe('Construcción de pozos de agua en comunidades rurales');
    });

    it('should return cause with actions', async () => {
      const response = await server.getRequest().get(`/causes/${CAUSE_IDS.AGUA_KENIA}`).expect(HttpStatus.OK);

      expect(response.body.actions).toBeDefined();
      expect(Array.isArray(response.body.actions)).toBe(true);
      expect(response.body.actions.length).toBeGreaterThan(0);
    });

    it('should return cause with ODS linked', async () => {
      const response = await server.getRequest().get(`/causes/${CAUSE_IDS.AGUA_KENIA}`).expect(HttpStatus.OK);

      expect(response.body.ods).toBeInstanceOf(Array);
      expect(response.body.ods).toContain(6); // SDG 6 - Clean water
      expect(response.body.ods).toContain(3); // SDG 3 - Good health
    });

    it('should return 400 when invalid UUID is provided', async () => {
      await server.getRequest().get('/causes/invalid-uuid-format').expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 when cause does not exist', async () => {
      await server.getRequest().get('/causes/00000000-0000-0000-0000-000000000999').expect(HttpStatus.NOT_FOUND);
    });

    it('should retrieve different causes with different actions', async () => {
      const response1 = await server.getRequest().get(`/causes/${CAUSE_IDS.BANCO_ALIMENTOS}`).expect(HttpStatus.OK);

      const response2 = await server.getRequest().get(`/causes/${CAUSE_IDS.APOYO_ESCOLAR}`).expect(HttpStatus.OK);

      expect(response1.body.id).toBe(CAUSE_IDS.BANCO_ALIMENTOS);
      expect(response2.body.id).toBe(CAUSE_IDS.APOYO_ESCOLAR);
      expect(response1.body.name).not.toBe(response2.body.name);
      // Both should have actions
      expect(Array.isArray(response1.body.actions)).toBe(true);
      expect(Array.isArray(response2.body.actions)).toBe(true);
    });

    it('should return cause with correct duration days', async () => {
      const response = await server.getRequest().get(`/causes/${CAUSE_IDS.ESCUELAS_TANZANIA}`).expect(HttpStatus.OK);

      expect(response.body.durationDays).toBe(365);
    });
  });
});
