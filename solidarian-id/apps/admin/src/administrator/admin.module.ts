import { AdminViewController } from '@app/admin/administrator/controllers/admin-view.controller';
import { ReportsApiController } from '@app/admin/administrator/controllers/reports-api.controller';
import { ReportsViewController } from '@app/admin/administrator/controllers/reports-view.controller';
import { RequestsModule } from '@app/admin/administrator/modules/requests.module';
import { UsersModule } from '@app/admin/administrator/modules/users.module';
import { Module } from '@nestjs/common';
import { MetricsApiController } from './controllers/admin-api.controller';
import { AdminDtoMapper } from './controllers/mappers/admin.dto.mapper';

@Module({
  imports: [RequestsModule, UsersModule],
  controllers: [AdminViewController, MetricsApiController, ReportsViewController, ReportsApiController],
  providers: [AdminDtoMapper],
  exports: [],
})
export class AdminModule {}
