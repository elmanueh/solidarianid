import { Request, RequestProps } from '@app/communities/shared/domain/model/entities/request';
import { CreateActionRequestDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/input/create-request-action.request.dto';
import { CreateCauseRequestDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/input/create-request-cause.request.dto';
import { CreateCommunityRequestDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/input/create-request-community.request.dto';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { RequestEventDto } from '@solidarianid/kafka';

/**
 * Request service for handling different types of requests
 */
export abstract class RequestsService {
  /**
   * Creates a community request.
   * @param createCommunityRequestDto Data Transfer Object containing community request details
   */
  abstract createCommunityRequest(
    createCommunityRequestDto: CreateCommunityRequestDto,
    actorId: string,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>>;

  /**
   * Creates a cause request.
   * @param createCauseRequestDto Data Transfer Object containing cause request details
   */
  abstract createCauseRequest(
    createCauseRequestDto: CreateCauseRequestDto,
    actorId: string,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>>;
  /**
   * Creates an action request.
   * @param createActionRequestDto Data Transfer Object containing action request details
   */
  abstract createActionRequest(
    createActionRequestDto: CreateActionRequestDto,
    actorId: string,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>>;

  /**
   * Accepts a request.
   * @param requestEventDto  Data Transfer Object containing request event details
   */
  abstract acceptRequest(
    requestEventDto: RequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, void>>;

  /**
   * Rejects a request.
   * @param requestEventDto Data Transfer Object containing request event details
   */
  abstract rejectRequest(
    requestEventDto: RequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, void>>;

  /**
   * Retrieves a request by its unique identifier.
   * @param id Unique identifier of the request
   */
  abstract getRequestById(id: string): Promise<Either<ValidationError | RepositoryException, Request<RequestProps>>>;

  /**
   * Retrieves requests by user ID.
   * @param userId Unique identifier of the user
   */
  abstract getRequestsByUserId(
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, Request<RequestProps>[]>>;
}
