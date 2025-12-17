import { Module } from '@nestjs/common';
import { CommunitiesController } from './infrastructure/controllers/communities.controller';
import { CommunitiesServiceImpl } from './application/services/communities.service.impl';
import { CommunitiesService } from 'apps/communities/src/domain/ports/communities.service';
import { CommunitiesRepository } from 'apps/communities/src/domain/ports/communities.repository';
import { CommunitiesRepositoryImpl } from 'apps/communities/src/infrastructure/repository/community.repository';

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
      useClass: CommunitiesRepositoryImpl,
    },
  ],
})
export class CommunitiesModule {}
