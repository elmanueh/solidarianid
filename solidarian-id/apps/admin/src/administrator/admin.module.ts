import { Module } from '@nestjs/common';
import { AdminViewController } from './controllers/admin-view.controller';
import { AdminApiController } from './controllers/admin-api.controller';

@Module({
  imports: [],
  controllers: [AdminViewController, AdminApiController],
  providers: [],
  exports: [],
})
export class AdminModule {}
