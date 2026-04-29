import { Repository } from '@app/ddd/repository/repository';
import { RequestType } from '../model/enums/request-type';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RequestProps, Request } from '../model/entities/request';

/**
 * Repository port for managing requests.
 *
 * This repository follows the Single Table Inheritance pattern where all request types
 * are stored in a single table with a discriminator column (type).
 */
export abstract class RequestsRepositoryPort extends Repository<Request<RequestProps>> {
  /**
   * Finds a request by its unique identifier and type.
   *
   * @param id - The unique identifier of the request
   * @param type - The type of request to find
   * @returns A promise that resolves to the request or an error if not found
   */
  abstract findByIdAndType(id: string, type: RequestType): Promise<Either<RepositoryException, Request<RequestProps>>>;

  /**
   * Finds all requests of a specific type.
   *
   * @param type - The type of requests to retrieve
   * @returns A promise that resolves to an array of requests of the specified type
   */
  abstract findByType(type: RequestType): Promise<Either<RepositoryException, Request<RequestProps>[]>>;

  /**
   * Finds all pending requests of a specific type.
   * Useful for administrator review workflows.
   *
   * @param type - The type of requests to retrieve
   * @returns A promise that resolves to an array of pending requests
   */
  abstract findPendingRequestsByType(type: RequestType): Promise<Either<RepositoryException, Request<RequestProps>[]>>;

  /**
   * Finds all requests created by a specific user.
   *
   * @param userId - The unique identifier of the user
   * @returns A promise that resolves to an array of requests created by the user
   */
  abstract findByUserId(userId: string): Promise<Either<RepositoryException, Request<RequestProps>[]>>;

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
  ): Promise<Either<RepositoryException, Request<RequestProps>[]>>;
}
