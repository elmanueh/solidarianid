import { CreateActionRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-action.request.dto';
import { CreateCauseRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-cause.request.dto';
import { CreateCommunityRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-community.request.dto';
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
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>>;

  /**
   * Creates a cause request.
   * @param createCauseRequestDto Data Transfer Object containing cause request details
   */
  abstract createCauseRequest(
    createCauseRequestDto: CreateCauseRequestDto,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>>;
  /**
   * Creates an action request.
   * @param createActionRequestDto Data Transfer Object containing action request details
   */
  abstract createActionRequest(
    createActionRequestDto: CreateActionRequestDto,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>>;

  abstract acceptRequest(
    requestEventDto: RequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, void>>;

  abstract rejectRequest(
    requestEventDto: RequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, void>>;
}
