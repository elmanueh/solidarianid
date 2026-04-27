import { CauseCreatedEvent } from '@app/communities/domain/events/cause-created.event';
import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { WebPushSenderPort } from '@app/communities/domain/ports/web-push-sender.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendCauseCreatedWebPushHandler implements DomainEventHandler<CauseCreatedEvent> {
  constructor(private readonly webPushSender: WebPushSenderPort) {}

  canHandle(event: CommunitiesDomainEvent): event is CauseCreatedEvent {
    return event instanceof CauseCreatedEvent;
  }

  async handle(event: CauseCreatedEvent): Promise<void> {
    const { cause } = event;

    await this.webPushSender.send({
      eventType: 'CAUSE',
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      initialDate: cause.initialDate,
      durationDays: cause.durationDays,
      ods: cause.ods,
      communityId: cause.communityId,
      userIds: cause.userIds,
    });
  }
}
