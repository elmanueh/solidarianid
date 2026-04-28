import { ActionsModule } from '@app/communities/actions/actions.module';
import { CausesModule } from '@app/communities/causes/causes.module';
import { CommunitiesModule } from '@app/communities/communities/communities.module';
import { RequestsConsumerAdapter } from '@app/communities/shared/infrastructure/messaging/consumers/requests.consumer';
import { UserConsumerAdapter } from '@app/communities/shared/infrastructure/messaging/consumers/user.consumer';
import { RequestsServiceImpl } from '@app/communities/shared/application/services/requests.service.impl';
import { PushSubscriptionsServiceImpl } from '@app/communities/shared/application/services/push-subscriptions.service.impl';
import { UserServiceImpl } from '@app/communities/shared/application/services/user.service.impl';
import { RequestController } from '@app/communities/shared/infrastructure/presentation/controllers/rest/request.controller';
import { SubscriptionsController } from '@app/communities/shared/infrastructure/presentation/controllers/rest/subscriptions.controller';
import { UserService } from '@app/communities/shared/domain/services/user.service';
import { RequestsService } from '@app/communities/shared/domain/services/request.service';
import { PushSubscriptionsService } from '@app/communities/shared/domain/services/push-subscriptions.service';
import { RequestsRepositoryPort } from '@app/communities/shared/domain/ports/requests.repository.port';
import { UsersRepositoryPort } from '@app/communities/shared/domain/ports/users.repository.port';
import { PushSubscriptionRepositoryPort } from '@app/communities/shared/domain/ports/push-subscription.repository.port';
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
import { EventsRepositoryTypeOrmAdapter } from '@app/communities/actions/infrastructure/persistence/repositories/events-typeorm.repository';
import { ObjectivesRepositoryTypeOrmAdapter } from '@app/communities/actions/infrastructure/persistence/repositories/objectives-typeorm.repository';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    AuthModule,
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
