import { RequestsController } from '@app/admin/administrator/controllers/requets.controller';
import { RequestsService } from '@app/admin/administrator/model/application/services/requests.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
