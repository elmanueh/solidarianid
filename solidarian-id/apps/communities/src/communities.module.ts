import { Module } from '@nestjs/common';
import { CommunitiesController } from './infrastructure/presentation/controllers/communities.controller';
import { CommunitiesServiceImpl } from './application/services/communities.service.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunitiesService } from './domain/services/communities.service';
import { CommunitiesRepositoryPort } from './domain/ports/communities.repository.port';
import { CommunitiesRepositoryAdapter } from './infrastructure/persistence/repositories/communities.repository.adapter';
import { CommunityEntity } from './infrastructure/persistence/entities/community.entity';
import { CommunityMapper } from './infrastructure/persistence/mappers/community.mapper';

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
