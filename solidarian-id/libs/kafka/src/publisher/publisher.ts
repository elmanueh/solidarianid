import { Entity } from '@app/ddd/entity';
import { EventType } from '../events.enum';

export abstract class Publisher<T extends Entity<any>> {
  /**
   *  Publishes an event of a specific type for the given entity.
   * @param eventType
   * @param entity
   */
  abstract publish(eventType: EventType, entity: T): Promise<void>;
}
