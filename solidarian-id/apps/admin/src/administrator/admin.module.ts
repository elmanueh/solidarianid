import { AdminApiController } from '@app/admin/administrator/controllers/admin-api.controller';
import { AdminViewController } from '@app/admin/administrator/controllers/admin-view.controller';
import { AdminService } from '@app/admin/administrator/model/application/services/admin.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AdminViewController, AdminApiController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
