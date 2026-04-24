import { CommunitiesQueryRepositoryPort } from '@app/communities/domain/ports/community-query.repository.port';
import { AuthModule } from '@app/communities/infrastructure/auth/auth.module';
import { DatabaseModule } from '@app/communities/infrastructure/persistence/database.module';
import '@app/communities/infrastructure/presentation/controllers/graphql/enums/enum.register';
import { DateScalar } from '@app/communities/infrastructure/presentation/controllers/graphql/scalars/data.scalar';
import { CommunitiesControllerGrpc } from '@app/communities/infrastructure/presentation/controllers/grpc/communities.controller.grpc';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaDynamicModule, RequestEventMapper } from '@solidarianid/kafka';
import { CommunityContextResolver, MembershipPermissionSource } from '@solidarianid/security/core';
import { CommunityMembershipPolicyEvaluator, SecurityAuthorizationModule } from '@solidarianid/security/nestjs';
import { PubSub } from 'graphql-subscriptions';
import { ActionsServiceImpl } from './application/services/actions.service.impl';
import { CausesServiceImpl } from './application/services/causes.service.impl';
import { CommunitiesServiceImpl } from './application/services/communities.service.impl';
import { RequestsServiceImpl } from './application/services/requests.service.impl';
import { SubscriptionsServiceImpl } from './application/services/subscriptions.service.impl';
import { UserServiceImpl } from './application/services/user.service.impl';
import { ActionsPublisherPort } from './domain/ports/actions.publisher.port';
import { ActionsRepositoryPort } from './domain/ports/actions.repository.port';
import { CausesPublisherPort } from './domain/ports/causes.publisher.port';
import { CausesRepositoryPort } from './domain/ports/causes.repository.port';
import { CommunitiesPublisherPort } from './domain/ports/communities.publisher.port';
import { CommunitiesRepositoryPort } from './domain/ports/communities.repository.port';
import { EventsRepositoryPort } from './domain/ports/events.repository.port';
import { ObjectivesRepositoryPort } from './domain/ports/objectives.repository.port';
import { RequestPublisherPort } from './domain/ports/requests.publisher.port';
import { RequestsRepositoryPort } from './domain/ports/requests.repository.port';
import { SubscriptionsPublisherPort } from './domain/ports/subscriptions-publisher.port';
import { UsersRepositoryPort } from './domain/ports/users.repository.port';
import { ActionsService } from './domain/services/actions.service';
import { CausesService } from './domain/services/causes.service';
import { CommunitiesService } from './domain/services/communities.service';
import { RequestsService } from './domain/services/request.service';
import { SubscriptionsService } from './domain/services/subscriptions.service';
import { UserService } from './domain/services/user.service';
import { CommunitiesCommunityContextResolverAdapter } from './infrastructure/authz/adapters/communities-community-context-resolver.adapter';
import { CommunitiesMembershipPermissionSourceAdapter } from './infrastructure/authz/adapters/communities-membership-permission-source.adapter';
import { RequestsConsumerAdapter } from './infrastructure/messaging/consumer/requests.consumer';
import { UserConsumerAdapter } from './infrastructure/messaging/consumer/user.consumer';
import { ActionEventMapper } from './infrastructure/messaging/mappers/action-event.mapper';
import { CauseEventMapper } from './infrastructure/messaging/mappers/cause-event.mapper';
import { CommunityEventMapper } from './infrastructure/messaging/mappers/community-event.mapper';
import { ActionsKafkaPublisherAdapter } from './infrastructure/messaging/publishers/actions.publisher';
import { CausesKafkaPublisherAdapter } from './infrastructure/messaging/publishers/causes.publisher';
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
import { EventsRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/events-typeorm.repository';
import { ObjectivesRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/objectives-typeorm.repository';
import { RequestsRepositoryTypeOrmAdapter } from './infrastructure/persistence/repositories/requests-typeorm.repository';
import { UsersTypeOrmRepositoryAdapter } from './infrastructure/persistence/repositories/users-typeorm.repository';
import { GraphqlLoadersService } from './infrastructure/presentation/controllers/graphql/loaders/graphql-loaders.service';
import { ActionsGraphqlMapper } from './infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';
import { CausesGraphqlMapper } from './infrastructure/presentation/controllers/graphql/mappers/causes-graphql.mapper';
import { CommunitiesGraphqlMapper } from './infrastructure/presentation/controllers/graphql/mappers/communities-graphql.mapper';
import { RequestGraphqlMapper } from './infrastructure/presentation/controllers/graphql/mappers/request-graphql.mapper';
import { UserGraphqlMapper } from './infrastructure/presentation/controllers/graphql/mappers/user-graphql.mapper';
import { ActionsSubscriptionsResolver } from './infrastructure/presentation/controllers/graphql/resolvers/actions-subscriptions.resolver';
import { ActionsResolver } from './infrastructure/presentation/controllers/graphql/resolvers/actions.resolver';
import { CausesSubscriptionsResolver } from './infrastructure/presentation/controllers/graphql/resolvers/causes-subscriptions.resolver';
import { CausesResolver } from './infrastructure/presentation/controllers/graphql/resolvers/causes.resolver';
import { CommunitiesResolver } from './infrastructure/presentation/controllers/graphql/resolvers/communities.resolver';
import { RequestSubscriptionsResolver } from './infrastructure/presentation/controllers/graphql/resolvers/request-subscriptions.resolver';
import { RequestResolver } from './infrastructure/presentation/controllers/graphql/resolvers/request.resolver';
import { GRAPHQL_PUB_SUB } from './infrastructure/presentation/controllers/graphql/subscriptions/community.subscription';
import { GraphqlSubscriptionsPublisherAdapter } from './infrastructure/presentation/controllers/graphql/subscriptions/graphql-subscriptions.publisher';
import { ActionsController } from './infrastructure/presentation/controllers/rest/actions.controller';
import { CausesController } from './infrastructure/presentation/controllers/rest/causes.controller';
import { CommunitiesController } from './infrastructure/presentation/controllers/rest/communities.controller';
import { RequestController } from './infrastructure/presentation/controllers/rest/request.controller';
import { SubscriptionsController } from './infrastructure/presentation/controllers/rest/subscriptions.controller';

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
    ]),
    KafkaDynamicModule.register(process.env.KAFKA_COMMUNITIES_CLIENT_ID ?? 'communities'),
    SecurityAuthorizationModule.register({
      imports: [TypeOrmModule.forFeature([CauseEntity, ActionEntity, CommunityUserEntity])],
      evaluators: [CommunityMembershipPolicyEvaluator],
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
      provide: SubscriptionsService,
      useClass: SubscriptionsServiceImpl,
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
      provide: SubscriptionsPublisherPort,
      useClass: GraphqlSubscriptionsPublisherAdapter,
    },
    {
      provide: GRAPHQL_PUB_SUB,
      useFactory: () => new PubSub(),
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
    CauseEventMapper,
    ActionEventMapper,

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
  ],
})
export class CommunitiesModule {}
