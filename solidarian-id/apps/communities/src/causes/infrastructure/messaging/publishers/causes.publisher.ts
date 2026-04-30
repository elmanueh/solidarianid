import { Cause } from '@app/communities/shared/domain/model/aggregates/cause';
import { CausesPublisherPort } from '@app/communities/shared/domain/ports/causes.publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPublisher, Topics } from '@solidarianid/kafka';
import { CauseEventDto, CauseEventMapper } from '../mappers/cause-event.mapper';

@Injectable()
export class CausesKafkaPublisherAdapter extends KafkaPublisher<Cause, CauseEventDto> implements CausesPublisherPort {
  constructor(
    @Inject(`communities_kafka`)
    private readonly kafkaClient: ClientKafka,
    private readonly causeEventMapper: CauseEventMapper,
  ) {
    super(kafkaClient, causeEventMapper, Topics.CAUSES);
  }
}
