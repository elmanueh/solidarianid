import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

/**
 * Thrown when a requested entity cannot be found in the repository.
 */
export class EntityNotFoundException extends RepositoryException {
  constructor(entity: string, id?: string, cause?: unknown) {
    super(`${entity} ${id ? `with ID ${id} ` : ''} was not found.`, cause);
    this.name = EntityNotFoundException.name;
  }
}
