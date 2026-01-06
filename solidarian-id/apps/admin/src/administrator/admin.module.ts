import { AdminApiController } from '@app/admin/administrator/controllers/admin-api.controller';
import { AdminViewController } from '@app/admin/administrator/controllers/admin-view.controller';
import { ReportsApiController } from '@app/admin/administrator/controllers/reports-api.controller';
import { ReportsViewController } from '@app/admin/administrator/controllers/reports-view.controller';
import { RequestsModule } from '@app/admin/administrator/modules/requests.module';
import { UsersModule } from '@app/admin/administrator/modules/users.module';
import { Module } from '@nestjs/common';
import { KafkaDynamicModule } from '@solidarianid/kafka';

@Module({
  imports: [RequestsModule, UsersModule],
  controllers: [AdminViewController, AdminApiController, ReportsViewController, ReportsApiController],
  providers: [],
  exports: [KafkaDynamicModule],
})
export class AdminModule {}
