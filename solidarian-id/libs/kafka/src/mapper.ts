import { Entity } from '@app/ddd/entity';
import { EventType } from './events.enum';

/**
 * Maps between domain models and persistence entities.
 *
 * @template TDomain Domain model type
 * @template TDto Event data transfer object type
 */
export abstract class Mapper<TDomain extends Entity<any>, TDto> {
  /**
   * Converts a domain model into its event representation.
   *
   * @param model Domain model
   * @param eventType Optional event type to determine which DTO to create
   */
  abstract toDto(model: TDomain, eventType?: EventType): TDto;
}
