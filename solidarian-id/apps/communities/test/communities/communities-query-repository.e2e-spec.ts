import { CommunityLastUsersJoinedData } from '@app/communities/application/services/data/community-last-users-joined.data';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/data/community-ranking.data';
import { CommunitiesQueryRepositoryPort } from '@app/communities/domain/ports/community-query.repository.port';
import { ActionEntity } from '@app/communities/infrastructure/persistence/entities/action.entity';
import { CauseEntity } from '@app/communities/infrastructure/persistence/entities/cause.entity';
import { CauseUserEntity } from '@app/communities/infrastructure/persistence/entities/cause-user.entity';
import { CommunityUserEntity } from '@app/communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from '@app/communities/infrastructure/persistence/entities/community.entity';
import { EventUserEntity } from '@app/communities/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/infrastructure/persistence/entities/objetive-user.entity';
import { RequestEntity } from '@app/communities/infrastructure/persistence/entities/request.entity';
import { UserEntity } from '@app/communities/infrastructure/persistence/entities/user.entity';
import { ActionEntityMapper } from '@app/communities/infrastructure/persistence/mappers/action-entity.mapper';
import { CauseEntityMapper } from '@app/communities/infrastructure/persistence/mappers/cause-entity.mapper';
import { CommunityEntityMapper } from '@app/communities/infrastructure/persistence/mappers/community-entity.mapper';
import { EventEntityMapper } from '@app/communities/infrastructure/persistence/mappers/event-entity.mapper';
import { ObjectiveEntityMapper } from '@app/communities/infrastructure/persistence/mappers/objetive-entity.mapper';
import { UserEntityMapper } from '@app/communities/infrastructure/persistence/mappers/user-entity.mapper';
import { CommunitiesQueryTypeOrmRepositoryAdapter } from '@app/communities/infrastructure/persistence/repositories/communities-query-typeorm.repository';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PG_COMMUNITY_IDS as COMMUNITY_IDS,
  PostgreSQLSeeder,
  PostgreSQLTestModule,
  TestContainerLifecycle,
} from '@solidarianid/testing';
import { DataSource } from 'typeorm';

describe('RequestsRepositoryTypeOrmAdapter (e2e)', () => {
  let app: INestApplication;
  let seeder: PostgreSQLSeeder;
  let communitiesQueryRepository: CommunitiesQueryRepositoryPort;

  beforeAll(async () => {
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

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        databaseModule,
        TypeOrmModule.forFeature([
          CommunityEntity,
          CommunityUserEntity,
          UserEntity,
          ActionEntity,
          CauseEntity,
          ObjectiveEntity,
          EventEntity,
        ]),
      ],
      providers: [
        UserEntityMapper,
        CommunityEntityMapper,
        CauseEntityMapper,
        ActionEntityMapper,
        ObjectiveEntityMapper,
        EventEntityMapper,

        {
          provide: CommunitiesQueryRepositoryPort,
          useClass: CommunitiesQueryTypeOrmRepositoryAdapter,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get<DataSource>('DataSource');
    seeder = new PostgreSQLSeeder(dataSource);
    communitiesQueryRepository = app.get(CommunitiesQueryRepositoryPort);
  });

  afterAll(async () => {
    if (app) await app.close();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  beforeEach(async () => {
    const dataSource = app.get<DataSource>('DataSource');
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    await seeder.clean();
    await seeder.seedCommunityUsers();
    await seeder.seedCommunities();
    await seeder.seedCommunityMembers();
  });

  describe('findOrderByMostUsers', () => {
    it('should return 2 communities ordered desc by number of users', async () => {
      const result = await communitiesQueryRepository.findOrderByMostUsers(2);

      expect(result.isRight()).toBe(true);
      const communities = result.value as RankingCommunitiesByUsersData[];
      expect(communities.length).toBe(2);
      expect(communities[0].userCount).toBeGreaterThanOrEqual(communities[1].userCount);
    });

    it('should return all communities when limit is undefined than total communities', async () => {
      const result = await communitiesQueryRepository.findOrderByMostUsers();

      expect(result.isRight()).toBe(true);
      const communities = result.value as RankingCommunitiesByUsersData[];
      expect(communities.length).toBe(3); // There are 3 seeded communities
    });

    it('should handle repository exceptions gracefully', async () => {
      // Simulate an error by closing the data source
      const dataSource = app.get<DataSource>('DataSource');
      await dataSource.destroy();

      const result = await communitiesQueryRepository.findOrderByMostUsers(2);

      expect(result.isLeft()).toBe(true);
      const error = result.value;
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('findMonthlyJoinedUsersByCommunity', () => {
    it('should return monthly joined users data for a community last month', async () => {
      const communityId = COMMUNITY_IDS.AFRICA;
      const monthInit = 1;

      const result = await communitiesQueryRepository.findJoinedUsersLastMonths(communityId, monthInit);

      expect(result.isRight()).toBe(true);
      const monthlyData = result.value as CommunityLastUsersJoinedData[];
      expect(monthlyData.length).toBeLessThanOrEqual(monthInit);
    });

    it('should return empty array if community has no joined users', async () => {
      const communityId = '00000000-0000-0000-0000-000000000000'; // Non-existent community ID
      const monthInit = 1;

      const result = await communitiesQueryRepository.findJoinedUsersLastMonths(communityId, monthInit);

      expect(result.isRight()).toBe(true);
      const monthlyData = result.value as CommunityLastUsersJoinedData[];
      expect(monthlyData.length).toBe(0);
    });

    it('should return data for all months if months parameter is undefined', async () => {
      const communityId = COMMUNITY_IDS.AFRICA;

      const result = await communitiesQueryRepository.findJoinedUsersLastMonths(communityId);

      expect(result.isRight()).toBe(true);
      const monthlyData = result.value as CommunityLastUsersJoinedData[];
      expect(monthlyData.length).toBeLessThanOrEqual(12);
    });

    it('should handle repository exceptions gracefully', async () => {
      // Simulate an error by closing the data source
      const dataSource = app.get<DataSource>('DataSource');
      await dataSource.destroy();

      const communityId = COMMUNITY_IDS.AFRICA;
      const monthInit = 1;

      const result = await communitiesQueryRepository.findJoinedUsersLastMonths(communityId, monthInit);

      expect(result.isLeft()).toBe(true);
      const error = result.value;
      expect(error).toBeInstanceOf(Error);
    });
  });
});
