import { Module } from '@nestjs/common';
import { AdminService } from './model/services/admin.service';
import { AdminViewController } from './controllers/admin-view.controller';
import { AdminApiController } from './controllers/admin-api.controller';

@Module({
  imports: [],
  controllers: [AdminViewController, AdminApiController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
