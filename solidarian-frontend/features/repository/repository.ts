import { Either } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

/**
 * Base abstract repository for frontend entities.
 *
 * Represents the persistence contract for domain entities.
 * Implementations are responsible for handling infrastructure concerns
 * and must never throw errors directly; instead, failures are returned
 * using {@link Either}.
 *
 * @template TDomain Domain entity type
 */
export abstract class Repository<TDomain extends Entity<any>> {
  /**
   * Persists a domain entity.
   *
   * Creates or updates the entity depending on its existence.
   * Any infrastructure or persistence error must be returned
   * as a {@link RepositoryException}.
   *
   * @param model Domain entity to persist
   */
  abstract save(model: TDomain): Promise<Either<RepositoryException, void>>;

  /**
   * Removes an entity by its unique identifier.
   *
   * If the operation fails due to infrastructure or persistence issues,
   * a {@link RepositoryException} must be returned.
   *
   * @param id Unique identifier of the entity
   */
  abstract remove(id: string): Promise<Either<RepositoryException, void>>;

  /**
   * Retrieves an entity by its unique identifier.
   *
   * Returns {@link EntityNotFoundException} when the entity does not exist.
   *
   * Returns {@link RepositoryException} for infrastructure-related failures.
   *
   * @param id Unique identifier of the entity
   *
   * @param relations Optional array of relation names to load with the entity
   */
  abstract findById(
    id: string,
    relations?: string[]
  ): Promise<Either<RepositoryException | EntityNotFoundException, TDomain>>;

  /**
   * Retrieves all entities from the repository.
   *
   * Returns {@link EntityNotFoundException} when no entities are found.
   *
   * Returns {@link RepositoryException} for infrastructure-related failures.
   */
  abstract findAll(relations?: string[]): Promise<Either<RepositoryException | EntityNotFoundException, TDomain[]>>;
}
