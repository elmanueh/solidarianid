import { RequestsController } from '@app/admin/administrator/controllers/requests.controller';
import { RequestsServiceImpl } from '@app/admin/administrator/model/application/services/requests.service.impl';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { RequestsPublisherPort } from '@app/admin/administrator/model/domain/ports/output/request.publisher.port';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { RequestConsumerAdapter } from '@app/admin/administrator/model/infrastructure/messaging/consumer/request.consumer';
import { RequestEventMapper } from '@app/admin/administrator/model/infrastructure/messaging/mappers/request-event.mapper';
import { RequestsKafkaPublisherAdapter } from '@app/admin/administrator/model/infrastructure/messaging/publisher/request.publisher';
import { ActionRequestSchema } from '@app/admin/administrator/model/infrastructure/persistence/entities/action-request.entity';
import { CauseRequestSchema } from '@app/admin/administrator/model/infrastructure/persistence/entities/cause-request.entity';
import { CommunityRequestSchema } from '@app/admin/administrator/model/infrastructure/persistence/entities/community-request.entity';
import {
  RequestEntity,
  RequestSchema,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { RequestMapper } from '@app/admin/administrator/model/infrastructure/persistence/mappers/request.mapper';
import { RequestRepositoryMongoose } from '@app/admin/administrator/model/infrastructure/persistence/repositories/request.repository-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaDynamicModule } from '@solidarianid/kafka';

@Module({
  imports: [
    KafkaDynamicModule.register(process.env.KAFKA_ADMIN_CLIENT_ID ?? 'admin'),
    MongooseModule.forFeature([
      {
        name: RequestEntity.name,
        schema: RequestSchema,
        discriminators: [
          { name: RequestType.COMMUNITY, schema: CommunityRequestSchema },
          { name: RequestType.CAUSE, schema: CauseRequestSchema },
          { name: RequestType.ACTION, schema: ActionRequestSchema },
        ],
      },
    ]),
  ],
  controllers: [RequestsController, RequestConsumerAdapter],
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
