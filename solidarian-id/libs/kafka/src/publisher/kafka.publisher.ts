import { Publisher } from './publisher';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Topics } from '../topics.enum';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaMessage } from '../kafka.message';
import { GenericEvent } from '../events/generic-event';
import { Entity } from '@app/ddd/entity';
import { EventType } from '../events.enum';

export class KafkaPublisher<T extends Entity<any>>
  extends Publisher<T>
  implements OnModuleDestroy, OnModuleInit
{
  constructor(
    private readonly publisher: ClientKafka,
    private readonly topic: Topics,
  ) {
    super();
    this.topic = topic;
  }

  publish(eventType: EventType, entity: T): Promise<void> {
    const genericEvent = GenericEvent.create(eventType, entity);

    const message: KafkaMessage = {
      key: entity.id.value,
      value: genericEvent,
    };

    this.publisher.emit<KafkaMessage>(this.topic, message);

    return Promise.resolve();
  }

  get _topic() {
    return this.topic;
  }

  onModuleInit() {
    return this.publisher.connect();
  }
  onModuleDestroy() {
    return this.publisher.close();
  }
}
