import { RequestsController } from '@app/admin/administrator/controllers/requets.controller';
import { RequestsServiceImpl } from '@app/admin/administrator/model/application/services/requests.service.impl';
import {
  RequestEntity,
  RequestSchema,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { RequestMapper } from '@app/admin/administrator/model/infrastructure/persistence/mappers/request.mapper';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { RequestRepositoryMongoose } from '@app/admin/administrator/model/infrastructure/persistence/repositories/request.repository-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: RequestEntity.name, schema: RequestSchema }])],
  controllers: [RequestsController],
  providers: [
    RequestMapper,
    {
      provide: RequestsRepositoryPort,
      useClass: RequestRepositoryMongoose,
    },
    {
      provide: RequestsService,
      useClass: RequestsServiceImpl,
    },
  ],
  exports: [RequestsService],
})
export class RequestsModule {}
