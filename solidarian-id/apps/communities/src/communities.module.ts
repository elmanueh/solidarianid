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
import { ObjectiveEntity } from './infrastructure/persistence/entities/objective.entity';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { ActionEntityMapper } from './infrastructure/persistence/mappers/action-entity.mapper';
import { CauseEntityMapper } from './infrastructure/persistence/mappers/cause-entity.mapper';
import { CommunityEntityMapper } from './infrastructure/persistence/mappers/community-entity.mapper';
import { EventEntityMapper } from './infrastructure/persistence/mappers/event-entity.mapper';
import { ObjectiveEntityMapper } from './infrastructure/persistence/mappers/objetive-entity.mapper';
import { UserEntityMapper } from './infrastructure/persistence/mappers/user-entity.mapper';
import { ActionsRepositoryTypeORM } from './infrastructure/persistence/repositories/actions-typeorm.repository';
import { CausesRepositoryTypeORM } from './infrastructure/persistence/repositories/causes-typeorm.repository';
import { CommunitiesRepositoryTypeORM } from './infrastructure/persistence/repositories/communities-typeorm.repository';
import { ActionsController } from './infrastructure/presentation/controllers/actions.controller';
import { CausesController } from './infrastructure/presentation/controllers/causes.controller';
import { CommunitiesController } from './infrastructure/presentation/controllers/communities.controller';

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
    ]),
  ],
  controllers: [CommunitiesController, CausesController, ActionsController],
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
    // Repositories
    {
      provide: CommunitiesRepositoryPort,
      useClass: CommunitiesRepositoryTypeORM,
    },
    {
      provide: CausesRepositoryPort,
      useClass: CausesRepositoryTypeORM,
    },
    {
      provide: ActionsRepositoryPort,
      useClass: ActionsRepositoryTypeORM,
    },
    // Persistence Mappers
    CommunityEntityMapper,
    CauseEntityMapper,
    ActionEntityMapper,
    UserEntityMapper,
    EventEntityMapper,
    ObjectiveEntityMapper,
  ],
})
export class CommunitiesModule {}
