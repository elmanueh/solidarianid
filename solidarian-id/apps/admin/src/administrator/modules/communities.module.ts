import { Module } from '@nestjs/common';
import { CommunitiesApiPort } from '@app/admin/administrator/model/domain/ports/output/communities.api.port';
import { CommunitiesApiServiceImpl } from '@app/admin/administrator/model/infrastructure/apis/communities.service.impl';

@Module({
  controllers: [],
  providers: [
    {
      provide: CommunitiesApiPort,
      useClass: CommunitiesApiServiceImpl,
    },
  ],
  exports: [CommunitiesApiPort],
})
export class CommunitiesModule {}
