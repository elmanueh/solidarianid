import { AdminApiController } from '@app/admin/administrator/controllers/admin-api.controller';
import { AdminViewController } from '@app/admin/administrator/controllers/admin-view.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AdminViewController, AdminApiController],
  providers: [],
  exports: [],
})
export class AdminModule {}
