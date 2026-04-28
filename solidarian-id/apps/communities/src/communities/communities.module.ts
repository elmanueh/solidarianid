import { CommunitiesController } from '@app/communities/communities/infrastructure/presentation/controllers/rest/communities.controller';
import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { CauseUserEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { CommunitiesServiceImpl } from '@app/communities/communities/application/services/communities.service.impl';
import { CommunityEventMapper } from '@app/communities/communities/infrastructure/messaging/mappers/community-event.mapper';
import { CommunitiesKafkaPublisherAdapter } from '@app/communities/communities/infrastructure/messaging/publishers/communities.publisher';
import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from '@app/communities/communities/infrastructure/persistence/entities/community.entity';
import { CommunityEntityMapper } from '@app/communities/communities/infrastructure/persistence/mappers/community-entity.mapper';
import { CommunitiesQueryTypeOrmRepositoryAdapter } from '@app/communities/communities/infrastructure/persistence/repositories/communities-query-typeorm.repository';
import { CommunitiesRepositoryTypeOrmAdapter } from '@app/communities/communities/infrastructure/persistence/repositories/communities-typeorm.repository';
import { ActionEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/action-entity.mapper';
import { EventEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/event-entity.mapper';
import { ObjectiveEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/objetive-entity.mapper';
import { CauseEntityMapper } from '@app/communities/causes/infrastructure/persistence/mappers/cause-entity.mapper';
import { CommunitiesPublisherPort } from '@app/communities/shared/domain/ports/communities.publisher.port';
import { CommunitiesRepositoryPort } from '@app/communities/shared/domain/ports/communities.repository.port';
import { CommunitiesQueryRepositoryPort } from '@app/communities/shared/domain/ports/community-query.repository.port';
import { PushSubscriptionRepositoryPort } from '@app/communities/shared/domain/ports/push-subscription.repository.port';
import { UsersRepositoryPort } from '@app/communities/shared/domain/ports/users.repository.port';
import { CommunitiesService } from '@app/communities/shared/domain/services/communities.service';
import { SubscriptionEntity } from '@app/communities/shared/infrastructure/persistence/entities/subscription.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { UserEntityMapper } from '@app/communities/shared/infrastructure/persistence/mappers/user-entity.mapper';
import { SubscriptionMapper } from '@app/communities/shared/infrastructure/persistence/mappers/subscription.mapper';
import { SubscriptionTypeOrmAdapter } from '@app/communities/shared/infrastructure/persistence/repositories/subscription-typeorm.repository';
import { UsersTypeOrmRepositoryAdapter } from '@app/communities/shared/infrastructure/persistence/repositories/users-typeorm.repository';
import { DomainEvents } from '@app/ddd/domain-events';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaDynamicModule } from '@solidarianid/kafka';
import { CommunitiesSharedModule } from '@app/communities/shared/communities-shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunityEntity,
      CommunityUserEntity,
      CauseEntity,
      CauseUserEntity,
      ActionEntity,
      EventEntity,
      EventUserEntity,
      ObjectiveEntity,
      ObjetiveUserEntity,
      SubscriptionEntity,
      UserEntity,
    ]),
    forwardRef(() => CommunitiesSharedModule),
    KafkaDynamicModule.register(process.env.KAFKA_COMMUNITIES_CLIENT_ID ?? 'communities'),
  ],
  controllers: [CommunitiesController],
  providers: [
    DomainEvents,
    {
      provide: CommunitiesService,
      useClass: CommunitiesServiceImpl,
    },
    {
      provide: CommunitiesRepositoryPort,
      useClass: CommunitiesRepositoryTypeOrmAdapter,
    },
    {
      provide: CommunitiesQueryRepositoryPort,
      useClass: CommunitiesQueryTypeOrmRepositoryAdapter,
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
      provide: CommunitiesPublisherPort,
      useClass: CommunitiesKafkaPublisherAdapter,
    },
    CommunityEventMapper,
    CommunityEntityMapper,
    CauseEntityMapper,
    ActionEntityMapper,
    EventEntityMapper,
    ObjectiveEntityMapper,
    UserEntityMapper,
    SubscriptionMapper,
  ],
  exports: [CommunitiesService, CommunitiesRepositoryPort, CommunitiesQueryRepositoryPort],
})
export class CommunitiesModule {}
