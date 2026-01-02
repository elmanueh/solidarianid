import { Repository } from '@app/ddd/repository/repository';
import { CommunityRequest } from '../model/entities/request-community';
import { CauseRequest } from '../model/entities/request-cause';
import { ActionRequest } from '../model/entities/request-action';
import { RequestType } from '../model/enums/request-type';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

/**
 * Union type representing all possible request types in the domain.
 * This allows type-safe operations across different request implementations.
 */
export type AnyRequest = CommunityRequest | CauseRequest | ActionRequest;

/**
 * Repository port for managing all types of requests (Community, Cause, Action).
 *
 * This repository follows the Single Table Inheritance pattern where all request types
 * are stored in a single table with a discriminator column (type).
 *
 * The port provides both generic operations (for all request types) and specific
 * methods that return concrete request types when needed.
 */
export abstract class RequestsRepositoryPort extends Repository<AnyRequest> {
  /**
   * Finds a community request by its unique identifier.
   *
   * @param id - The unique identifier of the community request
   * @returns A promise that resolves to the community request or null if not found
   * @throws If the request exists but is not of type COMMUNITY
   */
  abstract findCommunityRequestById(
    id: string,
  ): Promise<Either<RepositoryException, CommunityRequest>>;

  /**
   * Finds a cause request by its unique identifier.
   *
   * @param id - The unique identifier of the cause request
   * @returns A promise that resolves to the cause request or null if not found
   * @throws If the request exists but is not of type CAUSE
   */
  abstract findCauseRequestById(
    id: string,
  ): Promise<Either<RepositoryException, CauseRequest>>;

  /**
   * Finds an action request by its unique identifier.
   *
   * @param id - The unique identifier of the action request
   * @returns A promise that resolves to the action request or null if not found
   * @throws If the request exists but is not of type ACTION
   */
  abstract findActionRequestById(
    id: string,
  ): Promise<Either<RepositoryException, ActionRequest>>;

  /**
   * Finds all requests of a specific type.
   *
   * @param type - The type of requests to retrieve
   * @returns A promise that resolves to an array of requests of the specified type
   */
  abstract findByType(
    type: RequestType,
  ): Promise<Either<RepositoryException, AnyRequest[]>>;

  /**
   * Finds all pending requests of a specific type.
   * Useful for administrator review workflows.
   *
   * @param type - The type of requests to retrieve
   * @returns A promise that resolves to an array of pending requests
   */
  abstract findPendingRequestsByType(
    type: RequestType,
  ): Promise<Either<RepositoryException, AnyRequest[]>>;

  /**
   * Finds all requests created by a specific user.
   *
   * @param userId - The unique identifier of the user
   * @returns A promise that resolves to an array of requests created by the user
   */
  abstract findByUserId(
    userId: string,
  ): Promise<Either<RepositoryException, AnyRequest[]>>;

  /**
   * Finds all requests created by a specific user filtered by type.
   *
   * @param userId - The unique identifier of the user
   * @param type - The type of requests to retrieve
   * @returns A promise that resolves to an array of requests
   */
  abstract findByUserIdAndType(
    userId: string,
    type: RequestType,
  ): Promise<Either<RepositoryException, AnyRequest[]>>;
}
