/**
 * Base exception for repository-related errors.
 *
 * Represents technical failures in the persistence layer.
 */
export class RepositoryException extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = RepositoryException.name;
  }
}
