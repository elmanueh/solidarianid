import { RequestsService } from '@app/communities/domain/services/request.service';
import { CreateActionRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-action.request.dto';
import { CreateCauseRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-cause.request.dto';
import { CreateCommunityRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-community.request.dto';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { CommunityRequest } from '@app/communities/domain/model/entities/request-community';
import { CauseRequest } from '@app/communities/domain/model/entities/request-cause';
import { ActionRequest } from '@app/communities/domain/model/entities/request-action';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestPublisherPort } from '@app/communities/domain/ports/requests.publisher.port';
import { EventType } from '@solidarianid/kafka';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';

/**
 * Implementation of the RequestsService.
 *
 * This service handles the creation of different types of requests
 * (Community, Cause, Action) and persists them through the repository.
 */
@Injectable()
export class RequestsServiceImpl extends RequestsService {
  constructor(
    private readonly requestsRepository: RequestsRepositoryPort,
    private readonly requestPublisher: RequestPublisherPort,
    private readonly userRepository: UsersRepositoryPort,
  ) {
    super();
  }

  /**
   * Creates a new community request.
   *
   * @param dto - Data Transfer Object containing community request details
   * @returns Either a validation/repository error or the created request's ID
   */
  async createCommunityRequest(
    dto: CreateCommunityRequestDto,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>> {
    const userOrError = await this.userRepository.findById(dto.userId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const causeCreationRequests = dto.causeCreationRequests.map((cause) => ({
      name: cause.name,
      description: cause.description,
      status: RequestStatus.PENDING,
      ods: cause.ods,
      initialDate: new Date(cause.initialDate),
      durationDays: cause.durationDays,
    }));

    const communityRequestOrError = CommunityRequest.create({
      name: dto.name,
      description: dto.description,
      status: RequestStatus.PENDING,
      user: userOrError.value,
      causeCreationRequests,
    });

    if (communityRequestOrError.isLeft()) {
      return left(communityRequestOrError.value);
    }

    const saveResult = await this.requestsRepository.save(
      communityRequestOrError.value,
    );

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    await this.requestPublisher.publish(
      EventType.REQUEST_CREATED,
      communityRequestOrError.value,
    );

    return right(communityRequestOrError.value.id);
  }

  /**
   * Creates a new cause request.
   *
   * @param dto - Data Transfer Object containing cause request details
   * @returns Either a validation/repository error or the created request's ID
   */
  async createCauseRequest(
    dto: CreateCauseRequestDto,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>> {
    const userOrError = await this.userRepository.findById(dto.userId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const causeRequestOrError = CauseRequest.create({
      name: dto.name,
      description: dto.description,
      status: RequestStatus.PENDING,
      user: userOrError.value,
      ods: dto.ods,
      initialDate: new Date(dto.initialDate),
      durationDays: dto.durationDays,
    });

    if (causeRequestOrError.isLeft()) {
      return left(causeRequestOrError.value);
    }

    const saveResult = await this.requestsRepository.save(
      causeRequestOrError.value,
    );

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    await this.requestPublisher.publish(
      EventType.REQUEST_CREATED,
      causeRequestOrError.value,
    );

    return right(causeRequestOrError.value.id);
  }

  /**
   * Creates a new action request.
   *
   * @param dto - Data Transfer Object containing action request details
   * @returns Either a validation/repository error or the created request's ID
   */
  async createActionRequest(
    dto: CreateActionRequestDto,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>> {
    const userOrError = await this.userRepository.findById(dto.userId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const objectives = dto.objectives.map((objective) => ({
      name: objective.name,
      description: objective.description,
      quantity: objective.quantity,
      unit: objective.unit,
    }));

    const events = dto.events.map((event) => ({
      name: event.name,
      description: event.description,
      initialDate: new Date(event.initialDate),
      place: {
        direction: event.place.direction,
        city: event.place.city,
        countryCode: event.place.countryCode,
      },
    }));

    const actionRequestOrError = ActionRequest.create({
      name: dto.name,
      description: dto.description,
      status: RequestStatus.PENDING,
      user: userOrError.value,
      objectives,
      events,
    });

    if (actionRequestOrError.isLeft()) {
      return left(actionRequestOrError.value);
    }

    const saveResult = await this.requestsRepository.save(
      actionRequestOrError.value,
    );

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    await this.requestPublisher.publish(
      EventType.REQUEST_CREATED,
      actionRequestOrError.value,
    );
    return right(actionRequestOrError.value.id);
  }
}
