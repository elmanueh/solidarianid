import { Entity } from '@app/ddd/entity';

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
   */
  abstract toDto(model: TDomain): TDto;
}
