import { CommunitiesServiceImpl } from '@app/communities/communities/application/services/communities.service.impl';
import { CommunitiesRepositoryPort } from '@app/communities/communities/domain/ports/communities.repository.port';
import { CommunitiesService } from '@app/communities/communities/domain/services/communities.service';
import { CommunityEntity } from '@app/communities/communities/infrastructure/persistence/entities/community.entity';
import { CommunityMapper } from '@app/communities/communities/infrastructure/persistence/mappers/community.mapper';
import { CommunitiesRepositoryAdapter } from '@app/communities/communities/infrastructure/persistence/repositories/communities.repository.adapter';
import { CommunitiesController } from '@app/communities/communities/infrastructure/presentation/controllers/communities.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  exports: [],
})
export class CommunitiesModule {}
