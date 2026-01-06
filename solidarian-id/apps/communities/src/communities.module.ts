import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionsServiceImpl } from './application/services/actions.service.impl';
import { CausesServiceImpl } from './application/services/causes.service.impl';
import { CommunitiesServiceImpl } from './application/services/communities.service.impl';
import { ActionsRepositoryPort } from './domain/ports/actions.repository.port';
import { CausesRepositoryPort } from './domain/ports/causes.repository.port';
import { CommunitiesRepositoryPort } from './domain/ports/communities.repository.port';
import { ActionsService } from './domain/services/actions.service';
import { CausesService } from './domain/services/causes.service';
import { CommunitiesService } from './domain/services/communities.service';
import { ActionEntity } from './infrastructure/persistence/entities/action.entity';
import { CauseEntity } from './infrastructure/persistence/entities/cause.entity';
import { CommunityUserEntity } from './infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from './infrastructure/persistence/entities/community.entity';
import { EventEntity } from './infrastructure/persistence/entities/event.entity';
import { EventUserEntity } from './infrastructure/persistence/entities/event-user';
import { ObjectiveEntity } from './infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from './infrastructure/persistence/entities/objetive-user';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { ActionEntityMapper } from './infrastructure/persistence/mappers/action-entity.mapper';
import { CauseEntityMapper } from './infrastructure/persistence/mappers/cause-entity.mapper';
import { CommunityEntityMapper } from './infrastructure/persistence/mappers/community-entity.mapper';
import { EventEntityMapper } from './infrastructure/persistence/mappers/event-entity.mapper';
import { ObjectiveEntityMapper } from './infrastructure/persistence/mappers/objetive-entity.mapper';
import { UserEntityMapper } from './infrastructure/persistence/mappers/user-entity.mapper';
import { ActionsRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/actions-typeorm.repository';
import { CausesRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/causes-typeorm.repository';
import { CommunitiesRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/communities-typeorm.repository';
import { ActionsController } from './infrastructure/presentation/controllers/actions.controller';
import { CausesController } from './infrastructure/presentation/controllers/causes.controller';
import { CommunitiesController } from './infrastructure/presentation/controllers/communities.controller';
import { RequestController } from './infrastructure/presentation/controllers/request.controller';
import { RequestEntity } from './infrastructure/persistence/entities/request.entity';
import { KafkaDynamicModule, RequestEventMapper } from '@solidarianid/kafka';
import { RequestsRepositoryPort } from './domain/ports/requests.repository.port';
import { RequestsRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/requests-typeorm.repository';
import { RequestsService } from './domain/services/request.service';
import { RequestsServiceImpl } from './application/services/requests.service.impl';
import { RequestEntityMapper } from './infrastructure/persistence/mappers/request-entity.mapper';
import { RequestPublisherPort } from './domain/ports/requests.publisher.port';
import { RequestKafkaPublisherAdapter } from './infrastructure/messaging/publishers/requests.publisher';
import { UsersRepositoryPort } from './domain/ports/users.repository.port';
import { UsersTypeOrmRepositoryAdapter } from './infrastructure/persistence/repositories/users-typeorm.repository';
import { UserService } from './domain/services/user.service';
import { UserServiceImpl } from './application/services/user.service.impl';
import { UserConsumerAdapter } from './infrastructure/messaging/consumer/user.consumer';
import { RequestsConsumerAdapter } from './infrastructure/messaging/consumer/requests.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunityEntity,
      CauseEntity,
      ActionEntity,
      UserEntity,
      ObjectiveEntity,
      EventEntity,
      CommunityUserEntity,
      RequestEntity,
      EventUserEntity,
      ObjetiveUserEntity,
    ]),
    KafkaDynamicModule.register(process.env.KAFKA_COMMUNITIES_CLIENT_ID || 'communities'),
  ],
  controllers: [
    CommunitiesController,
    CausesController,
    ActionsController,
    RequestController,
    UserConsumerAdapter,
    RequestsConsumerAdapter,
  ],
  providers: [
    // Services
    {
      provide: CommunitiesService,
      useClass: CommunitiesServiceImpl,
    },
    {
      provide: CausesService,
      useClass: CausesServiceImpl,
    },
    {
      provide: ActionsService,
      useClass: ActionsServiceImpl,
    },
    {
      provide: RequestsService,
      useClass: RequestsServiceImpl,
    },
    // Repositories
    {
      provide: CommunitiesRepositoryPort,
      useClass: CommunitiesRepositoryTypeOrmAdapter,
    },
    {
      provide: CausesRepositoryPort,
      useClass: CausesRepositoryTypeOrmAdapter,
    },
    {
      provide: ActionsRepositoryPort,
      useClass: ActionsRepositoryTypeOrmAdapter,
    },
    {
      provide: RequestsRepositoryPort,
      useClass: RequestsRepositoryTypeOrmAdapter,
    },
    {
      provide: UsersRepositoryPort,
      useClass: UsersTypeOrmRepositoryAdapter,
    },
    // Publishers
    {
      provide: RequestPublisherPort,
      useClass: RequestKafkaPublisherAdapter,
    },
    {
      provide: UserService,
      useClass: UserServiceImpl,
    },
    // Persistence Mappers
    CommunityEntityMapper,
    CauseEntityMapper,
    ActionEntityMapper,
    UserEntityMapper,
    EventEntityMapper,
    ObjectiveEntityMapper,
    RequestEntityMapper,

    // Events Mappers
    RequestEventMapper,
  ],
})
export class CommunitiesModule {}
