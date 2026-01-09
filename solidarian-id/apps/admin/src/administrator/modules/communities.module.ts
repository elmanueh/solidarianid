import { Module } from '@nestjs/common';
import { CommunitiesApiPort } from '@app/admin/administrator/model/domain/ports/output/communities.api.port';
import { CommunitiesApiServiceImpl } from '@app/admin/administrator/model/infrastructure/apis/communities.service.impl';

/**
 * Módulo que gestiona la comunicación con el microservicio de Communities vía API
 */
@Module({
  providers: [
    {
      provide: CommunitiesApiPort,
      useClass: CommunitiesApiServiceImpl,
    },
  ],
  exports: [CommunitiesApiPort],
})
export class CommunitiesModule {}
