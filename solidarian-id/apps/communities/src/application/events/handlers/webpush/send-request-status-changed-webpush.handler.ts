import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { RequestStatusChangedEvent } from '@app/communities/domain/events/request-status-changed.event';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { WebPushSenderPort } from '@app/communities/domain/ports/web-push-sender.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendRequestStatusChangedWebPushHandler implements DomainEventHandler<RequestStatusChangedEvent> {
  constructor(private readonly webPushSender: WebPushSenderPort) {}

  canHandle(event: CommunitiesDomainEvent): event is RequestStatusChangedEvent {
    return event instanceof RequestStatusChangedEvent;
  }

  async handle(event: RequestStatusChangedEvent): Promise<void> {
    await this.webPushSender.send({
      eventType: 'REQUEST_STATUS_CHANGED',
      id: event.id,
      userId: event.userId,
      type: event.type,
      name: event.name,
      description: event.description,
      status: event.status,
      reason: event.reason,
      createdEntityId: event.createdEntityId,
    });
  }
}
