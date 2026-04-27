import { CauseCreatedEvent } from '@app/communities/domain/events/cause-created.event';
import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { CausesPublisherPort } from '@app/communities/domain/ports/causes.publisher.port';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { Injectable } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class PublishCauseCreatedToKafkaHandler implements DomainEventHandler<CauseCreatedEvent> {
  constructor(private readonly causesPublisher: CausesPublisherPort) {}

  canHandle(event: CommunitiesDomainEvent): event is CauseCreatedEvent {
    return event instanceof CauseCreatedEvent;
  }

  async handle(event: CauseCreatedEvent): Promise<void> {
    await this.causesPublisher.publish(EventType.CAUSE_CREATED, event.cause);
  }
}
