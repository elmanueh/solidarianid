import { Module } from '@nestjs/common';
import { CommunitiesController } from './infrastructure/presentation/controllers/communities.controller';
import { CommunitiesServiceImpl } from './application/services/communities.service.impl';
import { CommunitiesService } from 'apps/communities/src/domain/services/communities.service';
import { CommunitiesRepositoryPort } from 'apps/communities/src/domain/ports/communities.repository.port';
import { CommunitiesRepositoryAdapter } from 'apps/communities/src/infrastructure/persistence/repositories/communities.repository.adapter';
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
      provide: CommunitiesRepositoryPort,
      useClass: CommunitiesRepositoryAdapter,
    },
  ],
})
export class CommunitiesModule {}
