import { Action } from '@app/communities/shared/domain/model/aggregates/action';
import { ActionsPublisherPort } from '@app/communities/shared/domain/ports/actions.publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPublisher, Topics } from '@solidarianid/kafka';
import { ActionEventDto, ActionEventMapper } from '../mappers/action-event.mapper';

@Injectable()
export class ActionsKafkaPublisherAdapter
  extends KafkaPublisher<Action, ActionEventDto>
  implements ActionsPublisherPort
{
  constructor(
    @Inject(`communities_kafka`)
    private readonly kafkaClient: ClientKafka,
    private readonly actionEventMapper: ActionEventMapper,
  ) {
    super(kafkaClient, actionEventMapper, Topics.EVENTS);
  }
}
