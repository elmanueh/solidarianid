import { ActionCreatedEvent } from '@app/communities/domain/events/action-created.event';
import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { ActionsPublisherPort } from '@app/communities/domain/ports/actions.publisher.port';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { Injectable } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class PublishActionCreatedToKafkaHandler implements DomainEventHandler<ActionCreatedEvent> {
  constructor(private readonly actionsPublisher: ActionsPublisherPort) {}

  canHandle(event: CommunitiesDomainEvent): event is ActionCreatedEvent {
    return event instanceof ActionCreatedEvent;
  }

  async handle(event: ActionCreatedEvent): Promise<void> {
    await this.actionsPublisher.publish(EventType.ACTION_CREATED, event.action);
  }
}
