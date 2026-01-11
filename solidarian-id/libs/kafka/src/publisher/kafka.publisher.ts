import { Publisher } from './publisher';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Topics } from '../topics.enum';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaMessage } from '../kafka.message';
import { Entity } from '@app/ddd/entity';
import { EventType } from '../events.enum';
import { Mapper } from '../mapper';
import { GenericEvent } from '../events/generic.event';

export class KafkaPublisher<TDomain extends Entity<any>, TDto>
  extends Publisher<TDomain>
  implements OnModuleDestroy, OnModuleInit
{
  constructor(
    private readonly publisher: ClientKafka,
    private readonly mapper: Mapper<TDomain, TDto>,
    private readonly topic: Topics,
  ) {
    super();
    this.topic = topic;
  }

  publish(eventType: EventType, entity: TDomain): Promise<void> {
    const dto: TDto = this.mapper.toDto(entity, eventType);

    const genericEvent: GenericEvent<TDto> = new GenericEvent<TDto>(eventType, dto);

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
