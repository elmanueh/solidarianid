import { CommunitiesQueryRepositoryPort } from '@app/communities/domain/ports/community-query.repository.port';
import { DatabaseModule } from '@app/communities/infrastructure/persistence/database.module';
import { CommunitiesControllerGrpc } from '@app/communities/infrastructure/presentation/controllers/grpc/communities.controller.grpc';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaDynamicModule, RequestEventMapper } from '@solidarianid/kafka';
import { ActionsServiceImpl } from './application/services/actions.service.impl';
import { CausesServiceImpl } from './application/services/causes.service.impl';
import { CommunitiesServiceImpl } from './application/services/communities.service.impl';
import { RequestsServiceImpl } from './application/services/requests.service.impl';
import { UserServiceImpl } from './application/services/user.service.impl';
import { ActionsRepositoryPort } from './domain/ports/actions.repository.port';
import { CausesRepositoryPort } from './domain/ports/causes.repository.port';
import { CommunitiesPublisherPort } from './domain/ports/communities.publisher.port';
import { CommunitiesRepositoryPort } from './domain/ports/communities.repository.port';
import { RequestPublisherPort } from './domain/ports/requests.publisher.port';
import { RequestsRepositoryPort } from './domain/ports/requests.repository.port';
import { UsersRepositoryPort } from './domain/ports/users.repository.port';
import { ActionsService } from './domain/services/actions.service';
import { CausesService } from './domain/services/causes.service';
import { CommunitiesService } from './domain/services/communities.service';
import { RequestsService } from './domain/services/request.service';
import { UserService } from './domain/services/user.service';
import { RequestsConsumerAdapter } from './infrastructure/messaging/consumer/requests.consumer';
import { UserConsumerAdapter } from './infrastructure/messaging/consumer/user.consumer';
import { CommunityEventMapper } from './infrastructure/messaging/mappers/community-event.mapper';
import { CommunitiesKafkaPublisherAdapter } from './infrastructure/messaging/publishers/communities.publisher';
import { RequestKafkaPublisherAdapter } from './infrastructure/messaging/publishers/requests.publisher';
import { ActionEntity } from './infrastructure/persistence/entities/action.entity';
import { CauseUserEntity } from './infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from './infrastructure/persistence/entities/cause.entity';
import { CommunityUserEntity } from './infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from './infrastructure/persistence/entities/community.entity';
import { EventUserEntity } from './infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from './infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from './infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from './infrastructure/persistence/entities/objetive-user.entity';
import { RequestEntity } from './infrastructure/persistence/entities/request.entity';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { ActionEntityMapper } from './infrastructure/persistence/mappers/action-entity.mapper';
import { CauseEntityMapper } from './infrastructure/persistence/mappers/cause-entity.mapper';
import { CommunityEntityMapper } from './infrastructure/persistence/mappers/community-entity.mapper';
import { EventEntityMapper } from './infrastructure/persistence/mappers/event-entity.mapper';
import { ObjectiveEntityMapper } from './infrastructure/persistence/mappers/objetive-entity.mapper';
import { RequestEntityMapper } from './infrastructure/persistence/mappers/request-entity.mapper';
import { UserEntityMapper } from './infrastructure/persistence/mappers/user-entity.mapper';
import { ActionsRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/actions-typeorm.repository';
import { CausesRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/causes-typeorm.repository';
import { CommunitiesQueryTypeOrmRepositoryAdapter } from './infrastructure/persistence/repositories/communities-query-typeorm.repository';
import { CommunitiesRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/communities-typeorm.repository';
import { RequestsRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/requests-typeorm.repository';
import { UsersTypeOrmRepositoryAdapter } from './infrastructure/persistence/repositories/users-typeorm.repository';
import { ActionsController } from './infrastructure/presentation/controllers/rest/actions.controller';
import { CausesController } from './infrastructure/presentation/controllers/rest/causes.controller';
import { CommunitiesController } from './infrastructure/presentation/controllers/rest/communities.controller';
import { RequestController } from './infrastructure/presentation/controllers/rest/request.controller';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    TypeOrmModule.forFeature([
      CommunityEntity,
      CauseUserEntity,
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
    KafkaDynamicModule.register(process.env.KAFKA_COMMUNITIES_CLIENT_ID ?? 'communities'),
  ],
  controllers: [
    CommunitiesController,
    CausesController,
    ActionsController,
    RequestController,
    UserConsumerAdapter,
    RequestsConsumerAdapter,
    CommunitiesControllerGrpc,
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
      provide: CommunitiesQueryRepositoryPort,
      useClass: CommunitiesQueryTypeOrmRepositoryAdapter,
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
    {
      provide: CommunitiesPublisherPort,
      useClass: CommunitiesKafkaPublisherAdapter,
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
    CommunityEventMapper,
  ],
})
export class CommunitiesModule {}
