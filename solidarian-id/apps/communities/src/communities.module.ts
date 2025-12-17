import { Module } from '@nestjs/common';
import { CommunitiesController } from './infrastructure/presentation/controllers/communities.controller';
import { CommunitiesServiceImpl } from './application/services/communities.service.impl';
import { CommunitiesService } from 'apps/communities/src/domain/services/communities.service';
import { CommunitiesRepository } from 'apps/communities/src/domain/ports/communities.repository';
import { CommunitiesRepositoryAdapter } from 'apps/communities/src/infrastructure/persistence/repositories/community.repository.adapter';

@Module({
  imports: [],
  controllers: [CommunitiesController],
  providers: [
    {
      provide: CommunitiesService,
      useClass: CommunitiesServiceImpl,
    },
    {
      provide: CommunitiesRepository,
      useClass: CommunitiesRepositoryAdapter,
    },
  ],
})
export class CommunitiesModule {}
