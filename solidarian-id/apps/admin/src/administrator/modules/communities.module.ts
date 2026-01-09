import { Module } from '@nestjs/common';
import { CommunitiesApiService } from '@app/admin/administrator/model/domain/apis/communities.service';
import { CommunitiesApiServiceImpl } from '@app/admin/administrator/model/application/apis/communities.service.impl';

/**
 * Módulo que gestiona la comunicación con el microservicio de Communities vía API
 */
@Module({
  providers: [
    {
      provide: CommunitiesApiService,
      useClass: CommunitiesApiServiceImpl,
    },
  ],
  exports: [CommunitiesApiService],
})
export class CommunitiesModule {}
