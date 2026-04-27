import { ActionCreatedEvent } from '@app/communities/domain/events/action-created.event';
import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { WebPushSenderPort } from '@app/communities/domain/ports/web-push-sender.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendActionCreatedWebPushHandler implements DomainEventHandler<ActionCreatedEvent> {
  constructor(private readonly webPushSender: WebPushSenderPort) {}

  canHandle(event: CommunitiesDomainEvent): event is ActionCreatedEvent {
    return event instanceof ActionCreatedEvent;
  }

  async handle(event: ActionCreatedEvent): Promise<void> {
    const { action } = event;

    await this.webPushSender.send({
      eventType: 'ACTION',
      id: action.id.value,
      name: action.name,
      description: action.description,
      causeId: action.causeId,
    });
  }
}
