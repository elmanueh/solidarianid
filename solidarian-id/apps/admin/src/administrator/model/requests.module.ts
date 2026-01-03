import { RequestsController } from '@app/admin/administrator/controllers/requests.controller';
import { RequestsServiceImpl } from '@app/admin/administrator/model/application/services/requests.service.impl';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import {
  RequestEntity,
  RequestSchema,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { ActionRequestSchema } from '@app/admin/administrator/model/infrastructure/persistence/entities/action-request.entity';
import { CauseRequestSchema } from '@app/admin/administrator/model/infrastructure/persistence/entities/cause-request.entity';
import { CommunityRequestSchema } from '@app/admin/administrator/model/infrastructure/persistence/entities/community-request.entity';
import { RequestMapper } from '@app/admin/administrator/model/infrastructure/persistence/request.mapper';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { RequestRepositoryMongoose } from '@app/admin/administrator/model/infrastructure/persistence/request.repository-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { RequestConsumerAdapter } from '@app/admin/administrator/model/infrastructure/messaging/request.consumer';
import { KafkaDynamicModule } from '@solidarianid/kafka';
import { RequestsPublisherPort } from '@app/admin/administrator/model/domain/ports/output/request.publisher.port';
import { RequestsKafkaPublisherAdapter } from '@app/admin/administrator/model/infrastructure/messaging/request.publisher';
import { RequestEventMapper } from '@app/admin/administrator/model/infrastructure/messaging/request.event.mapper';

@Module({
  imports: [
    KafkaDynamicModule.register(process.env.KAFKA_REQUEST_CLIENT_ID ?? 'requests'),
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
