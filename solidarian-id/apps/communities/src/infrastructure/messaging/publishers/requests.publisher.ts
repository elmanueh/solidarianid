import {
  AnyRequest,
  RequestPublisherPort,
} from '@app/communities/domain/ports/requests.publisher.port';
import {
  KafkaPublisher,
  Topics,
  RequestEventDto,
  RequestEventMapper,
} from '@solidarianid/kafka';
import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

/**
 * Kafka publisher adapter for Request domain events.
 * Supports publishing Community, Cause, and Action request events.
 */
@Injectable()
export class RequestKafkaPublisherAdapter
  extends KafkaPublisher<AnyRequest, RequestEventDto>
  implements RequestPublisherPort
{
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly requestEventMapper: RequestEventMapper,
  ) {
    super(kafkaClient, requestEventMapper, Topics.REQUESTS);
  }
}
