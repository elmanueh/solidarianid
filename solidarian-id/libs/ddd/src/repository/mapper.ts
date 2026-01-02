import { Either } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { ValueObject } from '../value-object';

/**
 * Maps between domain models and persistence entities.
 *
 * @template TDomain Domain model type
 * @template TPersistence Persistence entity type
 */
export abstract class Mapper<TDomain extends Entity<any> | ValueObject<any>, TPersistence> {
  /**
   * Converts a domain model into its persistence representation.
   *
   * @param model Domain model
   */
  abstract toPersistence(model: TDomain): TPersistence;

  /**
   * Rehydrates a domain model from persistence data.
   *
   * @param entity Persistence model
   */
  abstract fromPersistence(entity: TPersistence): Either<ValidationError, TDomain>;
}
