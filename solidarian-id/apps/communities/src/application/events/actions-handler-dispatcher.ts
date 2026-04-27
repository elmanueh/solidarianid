import { ActionCreatedEvent } from '@app/communities/domain/events/action-created.event';
import { ActionsPublisherPort } from '@app/communities/domain/ports/actions.publisher.port';
import { RealtimeNotificationsPublisherPort } from '@app/communities/domain/ports/realtime-notifications.publisher.port';
import { SubscriptionType, WebPushSenderPort } from '@app/communities/domain/ports/web-push-sender.port';
import { DomainEvent } from '@app/ddd/domain-event';
import { DomainEvents } from '@app/ddd/domain-events';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class ActionsHandlerDispatcher implements OnModuleInit {
  constructor(
    private readonly domainEventRegister: DomainEvents,
    private readonly actionsPublisher: ActionsPublisherPort,
    private readonly webPushSender: WebPushSenderPort,
    private readonly realtimePublisher: RealtimeNotificationsPublisherPort,
  ) {}

  onModuleInit(): void {
    this.domainEventRegister.register(ActionCreatedEvent.name, event => this.handleEvent(event));
  }

  handleEvent(event: DomainEvent): void {
    switch (event.type) {
      case ActionCreatedEvent.name:
        {
          const actionEvent = event as ActionCreatedEvent;
          const action = actionEvent.action;

          void this.actionsPublisher.publish(EventType.ACTION_CREATED, action);
          void this.webPushSender.send({
            eventType: SubscriptionType.ACTION,
            id: action.id.value,
            name: action.name,
            description: action.description,
            causeId: action.causeId,
          });
          void this.realtimePublisher.publishActionCreated(actionEvent);
        }
        break;
      default:
        console.warn(`No handler for event type ${event.type}`);
    }
  }
}
