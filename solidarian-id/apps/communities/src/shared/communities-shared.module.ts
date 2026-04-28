import { ActionsModule } from '@app/communities/actions/actions.module';
import { CausesModule } from '@app/communities/causes/causes.module';
import { CommunitiesModule } from '@app/communities/communities/communities.module';
import { RequestResolver } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/resolvers/request.resolver';
import { RequestSubscriptionsResolver } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/resolvers/request-subscriptions.resolver';
import { RequestsConsumerAdapter } from '@app/communities/shared/infrastructure/messaging/consumers/requests.consumer';
import { UserConsumerAdapter } from '@app/communities/shared/infrastructure/messaging/consumers/user.consumer';
import '@app/communities/shared/infrastructure/presentation/controllers/graphql/enums/enum.register';
import { RequestsHandlerDispatcher } from '@app/communities/shared/application/events/requests-handler-dispatcher';
import { RequestsServiceImpl } from '@app/communities/shared/application/services/requests.service.impl';
import { PushSubscriptionsServiceImpl } from '@app/communities/shared/application/services/push-subscriptions.service.impl';
import { UserServiceImpl } from '@app/communities/shared/application/services/user.service.impl';
import { WebPushService } from '@app/communities/shared/application/services/web-push.service.impl';
import { RequestNotificationStrategy } from '@app/communities/shared/application/services/strategies/request-notification.strategy';
import { CauseNotificationStrategy } from '@app/communities/causes/application/services/strategies/cause-notification.strategy';
import { ActionNotificationStrategy } from '@app/communities/actions/application/strategies/action-notification.strategy';
import { RequestController } from '@app/communities/shared/infrastructure/presentation/controllers/rest/request.controller';
import { SubscriptionsController } from '@app/communities/shared/infrastructure/presentation/controllers/rest/subscriptions.controller';
import { UserService } from '@app/communities/shared/domain/services/user.service';
import { RequestsService } from '@app/communities/shared/domain/services/request.service';
import { PushSubscriptionsService } from '@app/communities/shared/domain/services/push-subscriptions.service';
import { RealtimeNotificationsPublisherPort } from '@app/communities/shared/domain/ports/realtime-notifications.publisher.port';
import { RequestPublisherPort } from '@app/communities/shared/domain/ports/requests.publisher.port';
import { WebPushSenderPort } from '@app/communities/shared/domain/ports/web-push-sender.port';
import { RequestsRepositoryPort } from '@app/communities/shared/domain/ports/requests.repository.port';
import { UsersRepositoryPort } from '@app/communities/shared/domain/ports/users.repository.port';
import { PushSubscriptionRepositoryPort } from '@app/communities/shared/domain/ports/push-subscription.repository.port';
import { RequestKafkaPublisherAdapter } from '@app/communities/shared/infrastructure/messaging/publishers/requests.publisher';
import { RequestEventMapper } from '@app/communities/shared/infrastructure/messaging/mappers/request-event.mapper';
import { RequestsRepositoryTypeOrmAdapter } from '@app/communities/shared/infrastructure/persistence/repositories/requests-typeorm.repository';
import { UsersTypeOrmRepositoryAdapter } from '@app/communities/shared/infrastructure/persistence/repositories/users-typeorm.repository';
import { SubscriptionTypeOrmAdapter } from '@app/communities/shared/infrastructure/persistence/repositories/subscription-typeorm.repository';
import { RequestEntityMapper } from '@app/communities/shared/infrastructure/persistence/mappers/request-entity.mapper';
import { UserEntityMapper } from '@app/communities/shared/infrastructure/persistence/mappers/user-entity.mapper';
import { SubscriptionMapper } from '@app/communities/shared/infrastructure/persistence/mappers/subscription.mapper';
import { RequestEntity } from '@app/communities/shared/infrastructure/persistence/entities/request.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { SubscriptionEntity } from '@app/communities/shared/infrastructure/persistence/entities/subscription.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { CommunitiesCommunityContextResolverAdapter } from '@app/communities/shared/infrastructure/authz/adapters/communities-community-context-resolver.adapter';
import { CommunitiesMembershipPermissionSourceAdapter } from '@app/communities/shared/infrastructure/authz/adapters/communities-membership-permission-source.adapter';
import { AuthModule } from '@app/communities/shared/infrastructure/auth/auth.module';
import { DatabaseModule } from '@app/communities/shared/infrastructure/persistence/database.module';
import { EventsRepositoryPort } from '@app/communities/shared/domain/ports/events.repository.port';
import { ObjectivesRepositoryPort } from '@app/communities/shared/domain/ports/objectives.repository.port';
import { DomainEvents } from '@app/ddd/domain-events';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityContextResolver, MembershipPermissionSource } from '@solidarianid/security/core';
import {
  CommunityMembershipPolicyEvaluator,
  SecurityAuthorizationModule,
  SelfOnlyPolicyEvaluator,
} from '@solidarianid/security/nestjs';
import { KafkaDynamicModule } from '@solidarianid/kafka';
import { EventsRepositoryTypeOrmAdapter } from '@app/communities/actions/infrastructure/persistence/repositories/events-typeorm.repository';
import { ObjectivesRepositoryTypeOrmAdapter } from '@app/communities/actions/infrastructure/persistence/repositories/objectives-typeorm.repository';
import { GRAPHQL_PUB_SUB } from '@app/communities/communities/infrastructure/presentation/controllers/graphql/subscriptions/community.subscription';
import { PubSub } from 'graphql-subscriptions';
import { GraphqlRealtimeNotificationsPublisherAdapter } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/subscriptions/graphql-realtime-notifications.publisher';
import { RequestGraphqlMapper } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/mappers/request-graphql.mapper';

const CommunitiesKafkaClientModule = KafkaDynamicModule.register(
  process.env.KAFKA_COMMUNITIES_CLIENT_ID ?? 'communities',
);

@Module({
  imports: [
    DatabaseModule.forRoot(),
    AuthModule,
    CommunitiesKafkaClientModule,
    forwardRef(() => ActionsModule),
    forwardRef(() => CausesModule),
    forwardRef(() => CommunitiesModule),
    TypeOrmModule.forFeature([
      RequestEntity,
      UserEntity,
      SubscriptionEntity,
      CauseEntity,
      ActionEntity,
      EventUserEntity,
      EventEntity,
      ObjectiveEntity,
      ObjetiveUserEntity,
      CommunityUserEntity,
    ]),
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
  controllers: [RequestController, SubscriptionsController, UserConsumerAdapter, RequestsConsumerAdapter],
  providers: [
    DomainEvents,
    {
      provide: GRAPHQL_PUB_SUB,
      useValue: new PubSub(),
    },
    {
      provide: UsersRepositoryPort,
      useClass: UsersTypeOrmRepositoryAdapter,
    },
    {
      provide: RequestsRepositoryPort,
      useClass: RequestsRepositoryTypeOrmAdapter,
    },
    {
      provide: PushSubscriptionRepositoryPort,
      useClass: SubscriptionTypeOrmAdapter,
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
      provide: UserService,
      useClass: UserServiceImpl,
    },
    {
      provide: RequestsService,
      useClass: RequestsServiceImpl,
    },
    {
      provide: PushSubscriptionsService,
      useClass: PushSubscriptionsServiceImpl,
    },
    RequestsHandlerDispatcher,
    RequestEventMapper,
    RequestNotificationStrategy,
    CauseNotificationStrategy,
    ActionNotificationStrategy,
    {
      provide: RequestPublisherPort,
      useClass: RequestKafkaPublisherAdapter,
    },
    {
      provide: WebPushSenderPort,
      useClass: WebPushService,
    },
    RequestResolver,
    RequestSubscriptionsResolver,
    RequestGraphqlMapper,
    GraphqlRealtimeNotificationsPublisherAdapter,
    {
      provide: RealtimeNotificationsPublisherPort,
      useExisting: GraphqlRealtimeNotificationsPublisherAdapter,
    },
    RequestEntityMapper,
    UserEntityMapper,
    SubscriptionMapper,
    CommunitiesCommunityContextResolverAdapter,
    CommunitiesMembershipPermissionSourceAdapter,
  ],
  exports: [
    ActionsModule,
    CausesModule,
    CommunitiesModule,
    CommunitiesKafkaClientModule,
    GRAPHQL_PUB_SUB,
    SecurityAuthorizationModule,
    RealtimeNotificationsPublisherPort,
    WebPushSenderPort,
    RequestsService,
    PushSubscriptionsService,
    UserService,
    UsersRepositoryPort,
    RequestsRepositoryPort,
    PushSubscriptionRepositoryPort,
    EventsRepositoryPort,
    ObjectivesRepositoryPort,
  ],
})
export class CommunitiesSharedModule {}
