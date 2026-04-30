import { CausesController } from '@app/communities/causes/infrastructure/presentation/controllers/rest/causes.controller';
import { CausesResolver } from '@app/communities/causes/infrastructure/presentation/controllers/graphql/resolvers/causes.resolver';
import { CausesSubscriptionsResolver } from '@app/communities/causes/infrastructure/presentation/controllers/graphql/resolvers/causes-subscriptions.resolver';
import { CausesServiceImpl } from '@app/communities/causes/application/services/causes.service.impl';
import { ActionEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/action-entity.mapper';
import { ActionsGraphqlMapper } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';
import { EventEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/event-entity.mapper';
import { ObjectiveEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/objetive-entity.mapper';
import { CauseEventMapper } from '@app/communities/causes/infrastructure/messaging/mappers/cause-event.mapper';
import { CausesKafkaPublisherAdapter } from '@app/communities/causes/infrastructure/messaging/publishers/causes.publisher';
import { CausesGraphqlMapper } from '@app/communities/causes/infrastructure/presentation/controllers/graphql/mappers/causes-graphql.mapper';
import { CauseUserEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { CauseEntityMapper } from '@app/communities/causes/infrastructure/persistence/mappers/cause-entity.mapper';
import { CausesQueryTypeOrmRepositoryAdapter } from '@app/communities/causes/infrastructure/persistence/repositories/causes-query-typeorm.repository';
import { CausesRepositoryTypeOrmAdapter } from '@app/communities/causes/infrastructure/persistence/repositories/causes-typeorm.repository';
import { GraphqlLoadersService } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/loaders/graphql-loaders.service';
import { CommunityEntity } from '@app/communities/communities/infrastructure/persistence/entities/community.entity';
import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntityMapper } from '@app/communities/communities/infrastructure/persistence/mappers/community-entity.mapper';
import { CommunitiesRepositoryTypeOrmAdapter } from '@app/communities/communities/infrastructure/persistence/repositories/communities-typeorm.repository';
import { CausesQueryRepositoryPort } from '@app/communities/shared/domain/ports/causes-query.repository.port';
import { CausesPublisherPort } from '@app/communities/shared/domain/ports/causes.publisher.port';
import { CausesRepositoryPort } from '@app/communities/shared/domain/ports/causes.repository.port';
import { CommunitiesRepositoryPort } from '@app/communities/shared/domain/ports/communities.repository.port';
import { PushSubscriptionRepositoryPort } from '@app/communities/shared/domain/ports/push-subscription.repository.port';
import { UsersRepositoryPort } from '@app/communities/shared/domain/ports/users.repository.port';
import { CausesService } from '@app/communities/shared/domain/services/causes.service';
import { SubscriptionEntity } from '@app/communities/shared/infrastructure/persistence/entities/subscription.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { UserEntityMapper } from '@app/communities/shared/infrastructure/persistence/mappers/user-entity.mapper';
import { SubscriptionMapper } from '@app/communities/shared/infrastructure/persistence/mappers/subscription.mapper';
import { SubscriptionTypeOrmAdapter } from '@app/communities/shared/infrastructure/persistence/repositories/subscription-typeorm.repository';
import { UsersTypeOrmRepositoryAdapter } from '@app/communities/shared/infrastructure/persistence/repositories/users-typeorm.repository';
import { DomainEvents } from '@app/ddd/domain-events';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunitiesSharedModule } from '@app/communities/shared/communities-shared.module';
import { CausesHandlerDispatcher } from '@app/communities/causes/application/events/causes-handler-dispatcher';

@Module({
  imports: [
    forwardRef(() => CommunitiesSharedModule),
    TypeOrmModule.forFeature([
      CauseEntity,
      CauseUserEntity,
      CommunityEntity,
      CommunityUserEntity,
      SubscriptionEntity,
      UserEntity,
    ]),
  ],
  controllers: [CausesController],
  providers: [
    DomainEvents,
    CausesResolver,
    CausesSubscriptionsResolver,
    CausesHandlerDispatcher,
    {
      provide: CausesService,
      useClass: CausesServiceImpl,
    },
    {
      provide: CausesRepositoryPort,
      useClass: CausesRepositoryTypeOrmAdapter,
    },
    {
      provide: CausesQueryRepositoryPort,
      useClass: CausesQueryTypeOrmRepositoryAdapter,
    },
    {
      provide: CommunitiesRepositoryPort,
      useClass: CommunitiesRepositoryTypeOrmAdapter,
    },
    {
      provide: UsersRepositoryPort,
      useClass: UsersTypeOrmRepositoryAdapter,
    },
    {
      provide: PushSubscriptionRepositoryPort,
      useClass: SubscriptionTypeOrmAdapter,
    },
    {
      provide: CausesPublisherPort,
      useClass: CausesKafkaPublisherAdapter,
    },
    ActionsGraphqlMapper,
    CausesGraphqlMapper,
    GraphqlLoadersService,
    CauseEventMapper,
    CauseEntityMapper,
    ActionEntityMapper,
    EventEntityMapper,
    ObjectiveEntityMapper,
    CommunityEntityMapper,
    UserEntityMapper,
    SubscriptionMapper,
  ],
  exports: [CausesService, CausesRepositoryPort, CausesQueryRepositoryPort, CommunitiesRepositoryPort],
})
export class CausesModule {}
