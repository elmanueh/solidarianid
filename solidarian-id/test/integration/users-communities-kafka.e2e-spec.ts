import { Transport } from '@nestjs/microservices';
import {
  EventTracker,
  KafkaTestModule,
  PostgreSQLTestModule,
  TestContainerLifecycle,
  TestServerHelper,
} from '@solidarianid/testing';
import { DataSource, Repository } from 'typeorm';

// Users microservice
import { UserPreferenceEntity } from '@app/users/infrastructure/persistence/entities/user-preference.entity';
import { UserEntity as UsersUserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UsersModule } from '@app/users/users.module';

// Communities microservice
import { CommunitiesModule } from '@app/communities/communities.module';
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
import { UserEntity as CommunitiesUserEntity } from '@app/communities/infrastructure/persistence/entities/user.entity';

import { UserService } from '@app/communities/domain/services/user.service';

/**
 * Note: Both microservices share the same PostgreSQL container but use different tables:
 * - Users MS: tbl_Usuarios
 * - Communities MS: user (and related tables)
 */
describe('Users-Communities Kafka Integration', () => {
  let usersServer: TestServerHelper;
  let communitiesServer: TestServerHelper;

  let usersDataSource: DataSource;
  let communitiesUserRepository: Repository<CommunitiesUserEntity>;

  let eventTracker: EventTracker;

  beforeAll(async () => {
    const kafkaModule = await KafkaTestModule.forRoot();
    const kafkaBroker = TestContainerLifecycle.getInstance().getKafkaBroker();

    // PostgreSQL module shared by both microservices
    const databaseModule = await PostgreSQLTestModule.forRoot([
      UsersUserEntity,
      UserPreferenceEntity,
      CommunitiesUserEntity,
      CommunityEntity,
      CauseEntity,
      CauseUserEntity,
      ActionEntity,
      ObjectiveEntity,
      EventEntity,
      CommunityUserEntity,
      RequestEntity,
      EventUserEntity,
      ObjetiveUserEntity,
    ]);

    // Users: HTTP + Kafka producer
    usersServer = new TestServerHelper();
    await usersServer.createWithMicroservice(
      { imports: [kafkaModule, databaseModule, UsersModule] },
      {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users-integration-test',
            brokers: [kafkaBroker],
          },
          consumer: {
            groupId: 'users-integration-test-consumer',
          },
        },
      },
    );

    usersDataSource = usersServer.getModule().get<DataSource>(DataSource);

    // Communities: Kafka consumer only
    communitiesServer = new TestServerHelper();
    await communitiesServer.createWithMicroservice(
      { imports: [kafkaModule, databaseModule, CommunitiesModule] },
      {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'communities-integration-test',
            brokers: [kafkaBroker],
          },
          consumer: {
            groupId: 'communities-integration-test-consumer',
          },
        },
      },
    );

    eventTracker = new EventTracker();

    // Spy on the UserService (application layer) instead of consumer (infrastructure)
    const userService = communitiesServer.getModule().get(UserService);
    const originalCreateUser = userService.createUser.bind(userService);
    const originalUpdateUser = userService.updateUser.bind(userService);

    jest.spyOn(userService, 'createUser').mockImplementation(async data => {
      const result = await originalCreateUser(data);
      eventTracker.markProcessed(`user:${data.id}`);
      return result;
    });

    jest.spyOn(userService, 'updateUser').mockImplementation(async data => {
      const result = await originalUpdateUser(data);
      eventTracker.markProcessed(`user:${data.id}`);
      return result;
    });

    const communitiesDataSource = communitiesServer.getModule().get<DataSource>(DataSource);
    communitiesUserRepository = communitiesDataSource.getRepository(CommunitiesUserEntity);
  }, 180000);

  beforeEach(async () => {
    eventTracker.clear();
    await usersDataSource.getRepository(UserPreferenceEntity).createQueryBuilder().delete().execute();
    await usersDataSource.getRepository(UsersUserEntity).createQueryBuilder().delete().execute();
    await communitiesUserRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await usersServer.close();
    await communitiesServer.close();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  describe('USER_CREATED Event Flow', () => {
    it('should create user in Communities when user is created in Users microservice', async () => {
      const newUserPayload = {
        fullName: 'Integration Test User',
        username: 'integrationUser',
        mobilePhone: '+34699123456',
        password: 'SecureP*ssw0rd123',
        city: 'Madrid',
        countryCode: 'ES',
      };

      const response = await usersServer.getRequest().post('/api/users').send(newUserPayload).expect(201);

      const locationHeader = response.headers['location'];
      expect(locationHeader).toBeDefined();
      const userId = locationHeader.split('/').pop()!;

      await eventTracker.waitFor(`user:${userId}`);

      const communitiesUser = await communitiesUserRepository.findOne({
        where: { id: userId },
      });

      expect(communitiesUser).toBeDefined();
      expect(communitiesUser?.fullName).toBe(newUserPayload.fullName);
      expect(communitiesUser?.mobilePhone).toBe(newUserPayload.mobilePhone);
    }, 30000);

    it('should handle multiple user creations in sequence', async () => {
      const users = [
        {
          fullName: 'First User Test',
          username: 'firstUser',
          mobilePhone: '+34611111111',
          password: 'Password123!',
          city: 'Barcelona',
          countryCode: 'ES',
        },
        {
          fullName: 'Second User Test',
          username: 'secondUser',
          mobilePhone: '+34622222222',
          password: 'Password456!',
          city: 'Valencia',
          countryCode: 'ES',
        },
      ];

      const createdUserIds: string[] = [];

      for (const userPayload of users) {
        const response = await usersServer.getRequest().post('/api/users').send(userPayload).expect(201);
        const userId = response.headers['location'].split('/').pop()!;
        createdUserIds.push(userId);
      }

      await Promise.all(createdUserIds.map(id => eventTracker.waitFor(`user:${id}`)));

      const communitiesUsers = await communitiesUserRepository.find();
      expect(communitiesUsers).toHaveLength(2);

      const firstUser = communitiesUsers.find(u => u.fullName === 'First User Test');
      const secondUser = communitiesUsers.find(u => u.fullName === 'Second User Test');

      expect(firstUser).toBeDefined();
      expect(secondUser).toBeDefined();
    }, 45000);
  });

  describe('USER_UPDATED Event Flow', () => {
    it('should update user in Communities when user is updated in Users microservice', async () => {
      const newUserPayload = {
        fullName: 'Original Name',
        username: 'updateTestUser',
        mobilePhone: '+34699111222',
        password: 'SecureP*ssw0rd123',
        city: 'Madrid',
        countryCode: 'ES',
      };

      const createResponse = await usersServer.getRequest().post('/api/users').send(newUserPayload).expect(201);

      const userId = createResponse.headers['location'].split('/').pop()!;

      await eventTracker.waitFor(`user:${userId}`);

      const initialCommunitiesUser = await communitiesUserRepository.findOne({
        where: { id: userId },
      });
      expect(initialCommunitiesUser?.fullName).toBe('Original Name');

      const updatePayload = {
        fullName: 'Updated Name',
        mobilePhone: '+34699333444',
      };

      await usersServer.getRequest().patch(`/api/users/${userId}`).send(updatePayload).expect(204);

      await eventTracker.waitFor(`user:${userId}`);

      // Small delay to ensure TypeORM transaction completes
      await new Promise(resolve => setTimeout(resolve, 100));

      const updatedCommunitiesUser = await communitiesUserRepository.findOne({
        where: { id: userId },
      });

      expect(updatedCommunitiesUser).toBeDefined();
      expect(updatedCommunitiesUser?.fullName).toBe('Updated Name');
      expect(updatedCommunitiesUser?.mobilePhone).toBe('+34699333444');
    }, 45000);
  });
});
