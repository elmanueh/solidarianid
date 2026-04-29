import { CauseCreatedEvent } from '@app/communities/shared/domain/events/cause-created.event';
import { CausesPublisherPort } from '@app/communities/shared/domain/ports/causes.publisher.port';
import { RealtimeNotificationsPublisherPort } from '@app/communities/shared/domain/ports/realtime-notifications.publisher.port';
import { SubscriptionType, WebPushSenderPort } from '@app/communities/shared/domain/ports/web-push-sender.port';
import { DomainEvent } from '@app/ddd/domain-event';
import { DomainEvents } from '@app/ddd/domain-events';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class CausesHandlerDispatcher implements OnModuleInit {
  constructor(
    private readonly domainEventRegister: DomainEvents,
    private readonly causesPublisher: CausesPublisherPort,
    private readonly webPushSender: WebPushSenderPort,
    private readonly realtimePublisher: RealtimeNotificationsPublisherPort,
  ) {}

  onModuleInit(): void {
    this.domainEventRegister.register(CauseCreatedEvent.name, event => this.handleEvent(event));
  }

  handleEvent(event: DomainEvent): void {
    switch (event.type) {
      case CauseCreatedEvent.name:
        {
          const causeEvent = event as CauseCreatedEvent;
          const cause = causeEvent.cause;

          void this.causesPublisher.publish(EventType.CAUSE_CREATED, cause);
          void this.webPushSender.send({
            eventType: SubscriptionType.CAUSE,
            id: cause.id.value,
            name: cause.name,
            description: cause.description,
            initialDate: cause.initialDate,
            durationDays: cause.durationDays,
            ods: cause.ods,
            communityId: cause.communityId,
            userIds: cause.userIds,
          });
          void this.realtimePublisher.publishCauseCreated(causeEvent);
        }
        break;
      default:
        console.warn(`No handler for event type ${event.type}`);
    }
  }
}
