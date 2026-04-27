import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { RequestCreatedEvent } from '@app/communities/domain/events/request-created.event';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { RequestPublisherPort } from '@app/communities/domain/ports/requests.publisher.port';
import { Injectable } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class PublishRequestCreatedToKafkaHandler implements DomainEventHandler<RequestCreatedEvent> {
  constructor(private readonly requestPublisher: RequestPublisherPort) {}

  canHandle(event: CommunitiesDomainEvent): event is RequestCreatedEvent {
    return event instanceof RequestCreatedEvent;
  }

  async handle(event: RequestCreatedEvent): Promise<void> {
    await this.requestPublisher.publish(EventType.REQUEST_CREATED, event.request);
  }
}
