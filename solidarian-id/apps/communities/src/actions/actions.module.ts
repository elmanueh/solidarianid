import { ActionsController } from '@app/communities/actions/infrastructure/presentation/controllers/rest/actions.controller';
import { ActionsResolver } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/resolvers/actions.resolver';
import { ActionsSubscriptionsResolver } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/resolvers/actions-subscriptions.resolver';
import { ActionsServiceImpl } from '@app/communities/actions/application/services/actions.service.impl';
import { ActionsGraphqlMapper } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';
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
import { ActionsPublisherPort } from '@app/communities/shared/domain/ports/actions.publisher.port';
import { ActionsRepositoryPort } from '@app/communities/shared/domain/ports/actions.repository.port';
import { EventsRepositoryPort } from '@app/communities/shared/domain/ports/events.repository.port';
import { ObjectivesRepositoryPort } from '@app/communities/shared/domain/ports/objectives.repository.port';
import { UsersRepositoryPort } from '@app/communities/shared/domain/ports/users.repository.port';
import { ActionsService } from '@app/communities/shared/domain/services/actions.service';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { UserEntityMapper } from '@app/communities/shared/infrastructure/persistence/mappers/user-entity.mapper';
import { UsersTypeOrmRepositoryAdapter } from '@app/communities/shared/infrastructure/persistence/repositories/users-typeorm.repository';
import { DomainEvents } from '@app/ddd/domain-events';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunitiesSharedModule } from '@app/communities/shared/communities-shared.module';
import { ActionsHandlerDispatcher } from '@app/communities/actions/application/events/actions-handler-dispatcher';

@Module({
  imports: [
    forwardRef(() => CommunitiesSharedModule),
    TypeOrmModule.forFeature([
      ActionEntity,
      EventUserEntity,
      EventEntity,
      ObjectiveEntity,
      ObjetiveUserEntity,
      UserEntity,
    ]),
  ],
  controllers: [ActionsController],
  providers: [
    DomainEvents,
    ActionsResolver,
    ActionsSubscriptionsResolver,
    ActionsHandlerDispatcher,
    {
      provide: ActionsService,
      useClass: ActionsServiceImpl,
    },
    {
      provide: ActionsRepositoryPort,
      useClass: ActionsRepositoryTypeOrmAdapter,
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
      provide: ActionsPublisherPort,
      useClass: ActionsKafkaPublisherAdapter,
    },
    ActionsGraphqlMapper,
    ActionEventMapper,
    ActionEntityMapper,
    EventEntityMapper,
    ObjectiveEntityMapper,
    UserEntityMapper,
  ],
  exports: [ActionsService, ActionsRepositoryPort],
})
export class ActionsModule {}
