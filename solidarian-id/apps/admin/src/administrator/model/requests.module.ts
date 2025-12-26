import { RequestsController } from '@app/admin/administrator/controllers/requets.controller';
import { RequestsService } from '@app/admin/administrator/model/application/services/requests.service';
import { RequestsServicePort } from '@app/admin/administrator/model/domain/interfaces/requests.service.port';
import {
  RequestEntity,
  RequestSchema,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { RequestMapper } from '@app/admin/administrator/model/infrastructure/persistence/request.mapper';
import { RequestsRepository } from '@app/admin/administrator/model/infrastructure/persistence/request.repository';
import { RequestRepositoryMongoose } from '@app/admin/administrator/model/infrastructure/persistence/request.repository-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RequestEntity.name, schema: RequestSchema },
    ]),
  ],
  controllers: [RequestsController],
  providers: [
    RequestMapper,
    {
      provide: RequestsRepository,
      useClass: RequestRepositoryMongoose,
    },
    {
      provide: RequestsServicePort,
      useClass: RequestsService,
    },
  ],
  exports: [RequestsRepository, RequestsServicePort],
})
export class RequestsModule {}
