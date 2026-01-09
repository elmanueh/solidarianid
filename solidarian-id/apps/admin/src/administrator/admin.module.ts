import { AdminViewController } from '@app/admin/administrator/controllers/admin-view.controller';
import { ReportsApiController } from '@app/admin/administrator/controllers/reports-api.controller';
import { ReportsViewController } from '@app/admin/administrator/controllers/reports-view.controller';
import { RequestsModule } from '@app/admin/administrator/modules/requests.module';
import { UsersModule } from '@app/admin/administrator/modules/users.module';
import { CommunitiesModule } from '@app/admin/administrator/modules/communities.module';
import { Module } from '@nestjs/common';
import { MetricsApiController } from './controllers/admin-api.controller';
import { AdminDtoMapper } from './controllers/mappers/admin.dto.mapper';
import { AdminViewServiceImpl } from './model/application/services/admin.service.impl';
import { AdminViewService } from './model/domain/services/admin.service';

@Module({
  imports: [RequestsModule, UsersModule, CommunitiesModule],
  controllers: [AdminViewController, MetricsApiController, ReportsViewController, ReportsApiController],
  providers: [
    AdminDtoMapper,
    {
      provide: AdminViewService,
      useClass: AdminViewServiceImpl,
    },
  ],
  exports: [],
})
export class AdminModule {}
