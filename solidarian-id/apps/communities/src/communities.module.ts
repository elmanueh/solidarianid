import { Module } from '@nestjs/common';
import { CommunitiesController } from './infrastructure/presentation/controllers/communities.controller';
import { CommunitiesServiceImpl } from './application/services/communities.service.impl';
import { CommunitiesService } from 'apps/communities/src/domain/services/communities.service';
import { CommunitiesRepository } from 'apps/communities/src/domain/ports/communities.repository';
import { CommunitiesRepositoryTypeORM } from 'apps/communities/src/infrastructure/persistence/repositories/communities.repository-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityEntity } from 'apps/communities/src/infrastructure/persistence/entities/community.entity';
import { CommunityMapper } from 'apps/communities/src/infrastructure/persistence/mappers/community.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityEntity])],
  controllers: [CommunitiesController],
  providers: [
    CommunityMapper,
    {
      provide: CommunitiesService,
      useClass: CommunitiesServiceImpl,
    },
    {
      provide: CommunitiesRepository,
      useClass: CommunitiesRepositoryTypeORM,
    },
  ],
})
export class CommunitiesModule {}
