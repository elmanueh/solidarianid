import { RequestsController } from '@app/admin/administrator/controllers/requets.controller';
import { RequestsServiceImpl } from '@app/admin/administrator/model/application/services/requests.service.impl';
import {
  RequestEntity,
  RequestSchema,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { RequestMapper } from '@app/admin/administrator/model/infrastructure/persistence/request.mapper';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { RequestRepositoryMongoose } from '@app/admin/administrator/model/infrastructure/persistence/request.repository-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { KafkaDynamicModule } from '@solidarianid/kafka';
import { RequestsPublisherPort } from '@app/admin/administrator/model/domain/ports/output/request.publisher.port';
import { RequestsKafkaPublisherAdapter } from '@app/admin/administrator/model/infrastructure/messaging/request.publisher';
import { RequestEventMapper } from '@app/admin/administrator/model/infrastructure/messaging/request.event.mapper';

@Module({
  imports: [
    KafkaDynamicModule.register(
      process.env.KAFKA_REQUEST_CLIENT_ID ?? 'requests',
    ),
    MongooseModule.forFeature([
      { name: RequestEntity.name, schema: RequestSchema },
    ]),
  ],
  controllers: [RequestsController],
  providers: [
    RequestMapper,
    RequestEventMapper,
    {
      provide: RequestsRepositoryPort,
      useClass: RequestRepositoryMongoose,
    },
    {
      provide: RequestsService,
      useClass: RequestsServiceImpl,
    },
    {
      provide: RequestsPublisherPort,
      useClass: RequestsKafkaPublisherAdapter,
    },
  ],
  exports: [RequestsService],
})
export class RequestsModule {}
