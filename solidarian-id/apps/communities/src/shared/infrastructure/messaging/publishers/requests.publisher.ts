import { AnyRequest, RequestPublisherPort } from '@app/communities/shared/domain/ports/requests.publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPublisher, RequestEventDto, RequestEventMapper, Topics } from '@solidarianid/kafka';

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
    @Inject(`communities_kafka`)
    private readonly kafkaClient: ClientKafka,
    private readonly requestEventMapper: RequestEventMapper,
  ) {
    super(kafkaClient, requestEventMapper, Topics.REQUESTS);
  }
}
