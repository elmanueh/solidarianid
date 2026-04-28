import { ActionsHandlerDispatcher } from '@app/communities/actions/application/events/actions-handler-dispatcher';
import { ActionsServiceImpl } from '@app/communities/actions/application/services/actions.service.impl';
import { ActionNotificationStrategy } from '@app/communities/actions/application/strategies/action-notification.strategy';
import { ActionEventMapper } from '@app/communities/actions/infrastructure/messaging/mappers/action-event.mapper';
import { ActionsKafkaPublisherAdapter } from '@app/communities/actions/infrastructure/messaging/publishers/actions.publisher';
import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { ActionEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/action-entity.mapper';
import { EventEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/event-entity.mapper';
import { ObjectiveEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/objetive-entity.mapper';
import { ActionsRepositoryTypeOrmAdapter } from '@app/communities/actions/infrastructure/persistence/repositories/actions-typeorm.repository';
import { EventsRepositoryTypeOrmAdapter } from '@app/communities/actions/infrastructure/persistence/repositories/events-typeorm.repository';
import { ObjectivesRepositoryTypeOrmAdapter } from '@app/communities/actions/infrastructure/persistence/repositories/objectives-typeorm.repository';
import { ActionsController } from '@app/communities/actions/infrastructure/presentation/controllers/rest/actions.controller';
import { CausesHandlerDispatcher } from '@app/communities/causes/application/events/causes-handler-dispatcher';
import { CausesServiceImpl } from '@app/communities/causes/application/services/causes.service.impl';
import { CauseNotificationStrategy } from '@app/communities/causes/application/services/strategies/cause-notification.strategy';
import { CauseEventMapper } from '@app/communities/causes/infrastructure/messaging/mappers/cause-event.mapper';
import { CauseUserEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { CauseEntityMapper } from '@app/communities/causes/infrastructure/persistence/mappers/cause-entity.mapper';
import { CausesController } from '@app/communities/causes/infrastructure/presentation/controllers/rest/causes.controller';
import { CommunitiesHandlerDispatcher } from '@app/communities/communities/application/events/communities-handler-dispatcher';
import { CommunitiesServiceImpl } from '@app/communities/communities/application/services/communities.service.impl';
import { CommunitiesGraphqlMapper } from '@app/communities/communities/infrastructure/presentation/controllers/graphql/mappers/communities-graphql.mapper';
import { CommunitiesResolver } from '@app/communities/communities/infrastructure/presentation/controllers/graphql/resolvers/communities.resolver';
import { GRAPHQL_PUB_SUB } from '@app/communities/communities/infrastructure/presentation/controllers/graphql/subscriptions/community.subscription';
import { CommunitiesControllerGrpc } from '@app/communities/communities/infrastructure/presentation/controllers/grpc/communities.controller.grpc';
import { RequestsHandlerDispatcher } from '@app/communities/shared/application/events/requests-handler-dispatcher';
import { CommunitiesQueryRepositoryPort } from '@app/communities/shared/domain/ports/community-query.repository.port';
import { AuthModule } from '@app/communities/shared/infrastructure/auth/auth.module';
import { DatabaseModule } from '@app/communities/shared/infrastructure/persistence/database.module';
import { RequestEntity } from '@app/communities/shared/infrastructure/persistence/entities/request.entity';
import { UsersTypeOrmRepositoryAdapter } from '@app/communities/shared/infrastructure/persistence/repositories/users-typeorm.repository';
import '@app/communities/shared/infrastructure/presentation/controllers/graphql/enums/enum.register';
import { RequestGraphqlMapper } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/mappers/request-graphql.mapper';
import { UserGraphqlMapper } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/mappers/user-graphql.mapper';
import { RequestSubscriptionsResolver } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/resolvers/request-subscriptions.resolver';
import { DateScalar } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/scalars/data.scalar';
import { GraphqlRealtimeNotificationsPublisherAdapter } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/subscriptions/graphql-realtime-notifications.publisher';
import { RequestController } from '@app/communities/shared/infrastructure/presentation/controllers/rest/request.controller';
import { SubscriptionsController } from '@app/communities/shared/infrastructure/presentation/controllers/rest/subscriptions.controller';
import { DomainEvents } from '@app/ddd/domain-events';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaDynamicModule, RequestEventMapper } from '@solidarianid/kafka';
import { CommunityContextResolver, MembershipPermissionSource } from '@solidarianid/security/core';
import {
  CommunityMembershipPolicyEvaluator,
  SecurityAuthorizationModule,
  SelfOnlyPolicyEvaluator,
} from '@solidarianid/security/nestjs';
import { PubSub } from 'graphql-subscriptions';
import { ActionsGraphqlMapper } from './actions/infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';
import { ActionsSubscriptionsResolver } from './actions/infrastructure/presentation/controllers/graphql/resolvers/actions-subscriptions.resolver';
import { ActionsResolver } from './actions/infrastructure/presentation/controllers/graphql/resolvers/actions.resolver';
import { CausesKafkaPublisherAdapter } from './causes/infrastructure/messaging/publishers/causes.publisher';
import { CausesQueryTypeOrmRepositoryAdapter } from './causes/infrastructure/persistence/repositories/causes-query-typeorm.repository';
import { CausesRepositoryTypeOrmAdapter } from './causes/infrastructure/persistence/repositories/causes-typeorm.repository';
import { CausesGraphqlMapper } from './causes/infrastructure/presentation/controllers/graphql/mappers/causes-graphql.mapper';
import { CausesSubscriptionsResolver } from './causes/infrastructure/presentation/controllers/graphql/resolvers/causes-subscriptions.resolver';
import { CausesResolver } from './causes/infrastructure/presentation/controllers/graphql/resolvers/causes.resolver';
import { CommunityEventMapper } from './communities/infrastructure/messaging/mappers/community-event.mapper';
import { CommunitiesKafkaPublisherAdapter } from './communities/infrastructure/messaging/publishers/communities.publisher';
import { CommunityUserEntity } from './communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from './communities/infrastructure/persistence/entities/community.entity';
import { CommunityEntityMapper } from './communities/infrastructure/persistence/mappers/community-entity.mapper';
import { CommunitiesQueryTypeOrmRepositoryAdapter } from './communities/infrastructure/persistence/repositories/communities-query-typeorm.repository';
import { CommunitiesRepositoryTypeOrmAdapter } from './communities/infrastructure/persistence/repositories/communities-typeorm.repository';
import { CommunitiesController } from './communities/infrastructure/presentation/controllers/rest/communities.controller';
import { PushSubscriptionsServiceImpl } from './shared/application/services/push-subscriptions.service.impl';
import { RequestsServiceImpl } from './shared/application/services/requests.service.impl';
import { RequestNotificationStrategy } from './shared/application/services/strategies/request-notification.strategy';
import { UserServiceImpl } from './shared/application/services/user.service.impl';
import { WebPushService } from './shared/application/services/web-push.service.impl';
import { ActionsPublisherPort } from './shared/domain/ports/actions.publisher.port';
import { ActionsRepositoryPort } from './shared/domain/ports/actions.repository.port';
import { CausesQueryRepositoryPort } from './shared/domain/ports/causes-query.repository.port';
import { CausesPublisherPort } from './shared/domain/ports/causes.publisher.port';
import { CausesRepositoryPort } from './shared/domain/ports/causes.repository.port';
import { CommunitiesPublisherPort } from './shared/domain/ports/communities.publisher.port';
import { CommunitiesRepositoryPort } from './shared/domain/ports/communities.repository.port';
import { EventsRepositoryPort } from './shared/domain/ports/events.repository.port';
import { ObjectivesRepositoryPort } from './shared/domain/ports/objectives.repository.port';
import { PushSubscriptionRepositoryPort } from './shared/domain/ports/push-subscription.repository.port';
import { RealtimeNotificationsPublisherPort } from './shared/domain/ports/realtime-notifications.publisher.port';
import { RequestPublisherPort } from './shared/domain/ports/requests.publisher.port';
import { RequestsRepositoryPort } from './shared/domain/ports/requests.repository.port';
import { UsersRepositoryPort } from './shared/domain/ports/users.repository.port';
import { WebPushSenderPort } from './shared/domain/ports/web-push-sender.port';
import { ActionsService } from './shared/domain/services/actions.service';
import { CausesService } from './shared/domain/services/causes.service';
import { CommunitiesService } from './shared/domain/services/communities.service';
import { PushSubscriptionsService } from './shared/domain/services/push-subscriptions.service';
import { RequestsService } from './shared/domain/services/request.service';
import { UserService } from './shared/domain/services/user.service';
import { CommunitiesCommunityContextResolverAdapter } from './shared/infrastructure/authz/adapters/communities-community-context-resolver.adapter';
import { CommunitiesMembershipPermissionSourceAdapter } from './shared/infrastructure/authz/adapters/communities-membership-permission-source.adapter';
import { RequestsConsumerAdapter } from './shared/infrastructure/messaging/consumers/requests.consumer';
import { UserConsumerAdapter } from './shared/infrastructure/messaging/consumers/user.consumer';
import { RequestKafkaPublisherAdapter } from './shared/infrastructure/messaging/publishers/requests.publisher';
import { SubscriptionEntity } from './shared/infrastructure/persistence/entities/subscription.entity';
import { UserEntity } from './shared/infrastructure/persistence/entities/user.entity';
import { RequestEntityMapper } from './shared/infrastructure/persistence/mappers/request-entity.mapper';
import { SubscriptionMapper } from './shared/infrastructure/persistence/mappers/subscription.mapper';
import { UserEntityMapper } from './shared/infrastructure/persistence/mappers/user-entity.mapper';
import { RequestsRepositoryTypeOrmAdapter } from './shared/infrastructure/persistence/repositories/requests-typeorm.repository';
import { SubscriptionTypeOrmAdapter } from './shared/infrastructure/persistence/repositories/subscription-typeorm.repository';
import { GraphqlLoadersService } from './shared/infrastructure/presentation/controllers/graphql/loaders/graphql-loaders.service';
import { RequestResolver } from './shared/infrastructure/presentation/controllers/graphql/resolvers/request.resolver';

@Module({
  imports: [
    AuthModule,
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
      SubscriptionEntity,
    ]),
    KafkaDynamicModule.register(process.env.KAFKA_COMMUNITIES_CLIENT_ID ?? 'communities'),
    SecurityAuthorizationModule.register({
      imports: [TypeOrmModule.forFeature([CauseEntity, ActionEntity, EventEntity, CommunityUserEntity])],
      evaluators: [CommunityMembershipPolicyEvaluator, SelfOnlyPolicyEvaluator],
      communityContextResolver: {
        provide: CommunityContextResolver,
        useClass: CommunitiesCommunityContextResolverAdapter,
      },
      membershipPermissionSource: {
        provide: MembershipPermissionSource,
        useClass: CommunitiesMembershipPermissionSourceAdapter,
      },
    }),
  ],
  controllers: [
    CommunitiesController,
    CausesController,
    ActionsController,
    RequestController,
    SubscriptionsController,
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
    {
      provide: PushSubscriptionsService,
      useClass: PushSubscriptionsServiceImpl,
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
      provide: CausesQueryRepositoryPort,
      useClass: CausesQueryTypeOrmRepositoryAdapter,
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
      provide: EventsRepositoryPort,
      useClass: EventsRepositoryTypeOrmAdapter,
    },
    {
      provide: ObjectivesRepositoryPort,
      useClass: ObjectivesRepositoryTypeOrmAdapter,
    },
    {
      provide: UsersRepositoryPort,
      useClass: UsersTypeOrmRepositoryAdapter,
    },
    {
      provide: PushSubscriptionRepositoryPort,
      useClass: SubscriptionTypeOrmAdapter,
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
    {
      provide: CausesPublisherPort,
      useClass: CausesKafkaPublisherAdapter,
    },
    {
      provide: ActionsPublisherPort,
      useClass: ActionsKafkaPublisherAdapter,
    },
    {
      provide: RealtimeNotificationsPublisherPort,
      useClass: GraphqlRealtimeNotificationsPublisherAdapter,
    },
    {
      provide: WebPushSenderPort,
      useClass: WebPushService,
    },

    {
      provide: GRAPHQL_PUB_SUB,
      useFactory: () => new PubSub(),
    },
    DomainEvents,
    // Persistence Mappers
    CommunityEntityMapper,
    CauseEntityMapper,
    ActionEntityMapper,
    UserEntityMapper,
    EventEntityMapper,
    ObjectiveEntityMapper,
    RequestEntityMapper,
    SubscriptionMapper,

    // Events Mappers
    RequestEventMapper,
    CommunityEventMapper,
    CauseEventMapper,
    ActionEventMapper,
    RequestNotificationStrategy,
    CauseNotificationStrategy,
    ActionNotificationStrategy,

    // GraphQL
    DateScalar,
    ActionsGraphqlMapper,
    CausesGraphqlMapper,
    CommunitiesGraphqlMapper,
    RequestGraphqlMapper,
    ActionsResolver,
    CausesResolver,
    RequestResolver,
    CommunitiesResolver,
    ActionsSubscriptionsResolver,
    CausesSubscriptionsResolver,
    RequestSubscriptionsResolver,
    UserGraphqlMapper,
    GraphqlLoadersService,
    CommunitiesCommunityContextResolverAdapter,
    CommunitiesMembershipPermissionSourceAdapter,
    ActionsHandlerDispatcher,
    CausesHandlerDispatcher,
    CommunitiesHandlerDispatcher,
    RequestsHandlerDispatcher,
  ],
})
export class CommunitiesModule {}
