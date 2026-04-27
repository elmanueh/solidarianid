import { RequestCreatedEvent } from '@app/communities/domain/events/request-created.event';
import { RequestStatusChangedEvent } from '@app/communities/domain/events/request-status-changed.event';
import { RealtimeNotificationsPublisherPort } from '@app/communities/domain/ports/realtime-notifications.publisher.port';
import { RequestPublisherPort } from '@app/communities/domain/ports/requests.publisher.port';
import { SubscriptionType, WebPushSenderPort } from '@app/communities/domain/ports/web-push-sender.port';
import { DomainEvent } from '@app/ddd/domain-event';
import { DomainEvents } from '@app/ddd/domain-events';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class RequestsHandlerDispatcher implements OnModuleInit {
  constructor(
    private readonly domainEventRegister: DomainEvents,
    private readonly requestPublisher: RequestPublisherPort,
    private readonly webPushSender: WebPushSenderPort,
    private readonly realtimePublisher: RealtimeNotificationsPublisherPort,
  ) {}

  onModuleInit(): void {
    this.domainEventRegister.register(RequestCreatedEvent.name, event => this.handleEvent(event));
    this.domainEventRegister.register(RequestStatusChangedEvent.name, event => this.handleEvent(event));
  }

  handleEvent(event: DomainEvent): void {
    switch (event.type) {
      case RequestCreatedEvent.name:
        void this.requestPublisher.publish(EventType.REQUEST_CREATED, (event as RequestCreatedEvent).request);
        break;
      case RequestStatusChangedEvent.name:
        {
          const requestEvent = event as RequestStatusChangedEvent;

          void this.webPushSender.send({
            eventType: SubscriptionType.REQUEST_STATUS_CHANGED,
            id: event.id,
            userId: requestEvent.userId,
            type: requestEvent.requestType,
            name: requestEvent.name,
            description: requestEvent.description,
            status: requestEvent.status,
            reason: requestEvent.reason,
            createdEntityId: requestEvent.createdEntityId,
          });
          void this.realtimePublisher.publishRequestStatusChanged(requestEvent);
        }
        break;
      default:
        console.warn(`No handler for event type ${event.type}`);
    }
  }
}
