import { AdminApiController } from '@app/admin/administrator/controllers/admin-api.controller';
import { AdminViewController } from '@app/admin/administrator/controllers/admin-view.controller';
import { RequestsModule } from '@app/admin/administrator/model/requests.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [RequestsModule],
  controllers: [AdminViewController, AdminApiController],
  providers: [],
  exports: [],
})
export class AdminModule {}
