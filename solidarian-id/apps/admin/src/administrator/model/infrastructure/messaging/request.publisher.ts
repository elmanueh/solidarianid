import { Request } from '@app/admin/administrator/model/domain/models/request';
import { RequestsPublisherPort } from '@app/admin/administrator/model/domain/ports/output/request.publisher.port';
import { RequestEventMapper } from '@app/admin/administrator/model/infrastructure/messaging/request-event.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPublisher, RequestEventDto, Topics } from '@solidarianid/kafka';

@Injectable()
export class RequestsKafkaPublisherAdapter
  extends KafkaPublisher<Request<any>, RequestEventDto>
  implements RequestsPublisherPort
{
  constructor(
    @Inject('admin_kafka') publisher: ClientKafka,
    private readonly requestEventMapper: RequestEventMapper,
  ) {
    super(publisher, requestEventMapper, Topics.REQUESTS);
  }
}
