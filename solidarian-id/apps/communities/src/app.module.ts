import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActionsService } from './domain/services/actions.service';
import { ActionsServiceImpl } from './application/services/actions.service.impl';
import { CausesService } from './domain/services/causes.service';
import { CausesServiceImpl } from './application/services/causes.service.impl';
import { CommunitiesService } from './domain/services/communities.service';
import { CommunitiesServiceImpl } from './application/services/communities.service.impl';
import { CommunitiesController } from './infrastructure/presentation/controllers/communities.controller';
import { CausesController } from './infrastructure/presentation/controllers/causes.controller';
import { ActionsController } from './infrastructure/presentation/controllers/actions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityEntity } from './infrastructure/persistence/entities/community.entity';
import { CauseEntity } from './infrastructure/persistence/entities/cause.entity';
import { ActionEntity } from './infrastructure/persistence/entities/action.entity';
import { CommunityEntityMapper } from './infrastructure/persistence/mappers/community-entity.mapper';
import { CauseEntityMapper } from './infrastructure/persistence/mappers/cause-entity.mapper';
import { ActionEntityMapper } from './infrastructure/persistence/mappers/action-entity.mapper';
import { CommunitiesRepositoryPort } from './domain/ports/communities.repository.port';
import { CommunitiesRepositoryTypeORM } from './infrastructure/persistence/repositories/communities-typeorm.repository';
import { CausesRepositoryPort } from './domain/ports/causes.repository.port';
import { CausesRepositoryTypeORM } from './infrastructure/persistence/repositories/causes-typeorm.repository';
import { ActionsRepositoryPort } from './domain/ports/actions.repository.port';
import { ActionsRepositoryTypeORM } from './infrastructure/persistence/repositories/actions-typeorm.repository';
import { UserEntityMapper } from './infrastructure/persistence/mappers/user-entity.mapper';
import { EventEntityMapper } from './infrastructure/persistence/mappers/event-entity.mapper';
import { DatabaseModule } from './database.module';
import { ObjectiveEntityMapper } from './infrastructure/persistence/mappers/objetive-entity.mapper';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { ObjetiveEntity } from './infrastructure/persistence/entities/objetive.entity';
import { EventEntity } from './infrastructure/persistence/entities/evento.entity';
import { CommunityUserEntity } from './infrastructure/persistence/entities/community-user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([
      CommunityEntity,
      CauseEntity,
      ActionEntity,
      UserEntity,
      ObjetiveEntity,
      EventEntity,
      CommunityUserEntity,
    ]),
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
  controllers: [CommunitiesController, CausesController, ActionsController],
})
export class AppModule {}
