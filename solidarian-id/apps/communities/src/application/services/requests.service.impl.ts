import { RequestCreatedEvent } from '@app/communities/domain/events/request-created.event';
import { RequestStatusChangedEvent } from '@app/communities/domain/events/request-status-changed.event';
import { UserPermissionError } from '@app/communities/domain/errors/user-permission.error';
import { Request, RequestProps } from '@app/communities/domain/model/entities/request';
import { ActionRequest } from '@app/communities/domain/model/entities/request-action';
import { CauseRequest } from '@app/communities/domain/model/entities/request-cause';
import { CommunityRequest } from '@app/communities/domain/model/entities/request-community';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { DomainEventBusPort } from '@app/communities/domain/ports/domain-event-bus.port';
import { PushSubscriptionRepositoryPort } from '@app/communities/domain/ports/push-subscription.repository.port';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { ActionsService } from '@app/communities/domain/services/actions.service';
import { CausesService } from '@app/communities/domain/services/causes.service';
import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { RequestsService } from '@app/communities/domain/services/request.service';
import { CreateActionRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-action.request.dto';
import { CreateCauseRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-cause.request.dto';
import { CreateCommunityRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-community.request.dto';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Injectable } from '@nestjs/common';
import {
  ActionRequestEventDto,
  CauseRequestEventDto,
  CommunityRequestEventDto,
  RequestEventDto,
} from '@solidarianid/kafka';

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
    private readonly eventBus: DomainEventBusPort,
    private readonly userRepository: UsersRepositoryPort,
    private readonly communityRepository: CommunitiesRepositoryPort,
    private readonly causeRepository: CausesRepositoryPort,
    private readonly communitiesService: CommunitiesService,
    private readonly causesService: CausesService,
    private readonly actionsService: ActionsService,
    private readonly pushSubscriptionRepository: PushSubscriptionRepositoryPort,
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
    actorId: string,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>> {
    const userOrError = await this.userRepository.findById(actorId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const causeCreationRequests = dto.causeCreationRequests.map(cause => ({
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
      type: RequestType.COMMUNITY,
      user: userOrError.value,
      causeCreationRequests,
    });

    if (communityRequestOrError.isLeft()) {
      return left(communityRequestOrError.value);
    }

    const saveResult = await this.requestsRepository.save(communityRequestOrError.value);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    const requestSubscriptionOrError = await this.syncUserRequestSubscriptions(
      actorId,
      communityRequestOrError.value.id.value,
    );

    if (requestSubscriptionOrError.isLeft()) {
      return left(requestSubscriptionOrError.value);
    }

    await this.eventBus.publish(new RequestCreatedEvent(communityRequestOrError.value));

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
    actorId: string,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>> {
    const userOrError = await this.userRepository.findById(actorId);
    const communityOrError = await this.communityRepository.findById(dto.communityId, ['members', 'members.user']);

    if (communityOrError.isLeft()) {
      return left(communityOrError.value);
    }

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    if (!communityOrError.value.isAdminOrCreator(userOrError.value)) {
      return left(
        new UserPermissionError('User must be an admin or creator of the community to create a cause request'),
      );
    }

    const causeRequestOrError = CauseRequest.create({
      name: dto.name,
      description: dto.description,
      status: RequestStatus.PENDING,
      user: userOrError.value,
      type: RequestType.CAUSE,
      ods: dto.ods,
      initialDate: new Date(dto.initialDate),
      durationDays: dto.durationDays,
      communityId: dto.communityId,
    });

    if (causeRequestOrError.isLeft()) {
      return left(causeRequestOrError.value);
    }

    const saveResult = await this.requestsRepository.save(causeRequestOrError.value);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    const requestSubscriptionOrError = await this.syncUserRequestSubscriptions(
      actorId,
      causeRequestOrError.value.id.value,
    );

    if (requestSubscriptionOrError.isLeft()) {
      return left(requestSubscriptionOrError.value);
    }

    await this.eventBus.publish(new RequestCreatedEvent(causeRequestOrError.value));

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
    actorId: string,
  ): Promise<Either<ValidationError | RepositoryException, UniqueEntityID>> {
    const userOrError = await this.userRepository.findById(actorId);
    const causeOrError = await this.causeRepository.findById(dto.causeId);

    if (causeOrError.isLeft()) {
      return left(causeOrError.value);
    }

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const communityOrError = await this.communityRepository.findById(causeOrError.value.communityId, [
      'members',
      'members.user',
    ]);

    if (communityOrError.isLeft()) {
      return left(communityOrError.value);
    }

    if (!communityOrError.value.isAdminOrCreator(userOrError.value)) {
      return left(
        new UserPermissionError('User must be an admin or creator of the community to create an action request'),
      );
    }

    const objectives = dto.objectives.map(objective => ({
      name: objective.name,
      description: objective.description,
      quantity: objective.quantity,
      unit: objective.unit,
    }));

    const events = dto.events.map(event => ({
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
      type: RequestType.ACTION,
      user: userOrError.value,
      objectives,
      events,
      causeId: dto.causeId,
    });

    if (actionRequestOrError.isLeft()) {
      return left(actionRequestOrError.value);
    }

    const saveResult = await this.requestsRepository.save(actionRequestOrError.value);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    const requestSubscriptionOrError = await this.syncUserRequestSubscriptions(
      actorId,
      actionRequestOrError.value.id.value,
    );

    if (requestSubscriptionOrError.isLeft()) {
      return left(requestSubscriptionOrError.value);
    }

    await this.eventBus.publish(new RequestCreatedEvent(actionRequestOrError.value));
    return right(actionRequestOrError.value.id);
  }

  async acceptRequest(requestEventDto: RequestEventDto): Promise<Either<ValidationError | RepositoryException, void>> {
    const requestOrError = await this.requestsRepository.findById(requestEventDto.id, ['user']);

    if (requestOrError.isLeft()) {
      return left(requestOrError.value);
    }

    const request: Request<RequestProps> = requestOrError.value;
    request.accept(requestEventDto.reason ?? 'No reason provided');

    const saveResult = await this.requestsRepository.save(request);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    let createdEntityId: string | undefined;

    // Additional logic based on request type
    switch (request.type) {
      case RequestType.COMMUNITY: {
        const communityResult = await this.communitiesService.create(requestEventDto as CommunityRequestEventDto);
        if (communityResult.isLeft()) {
          return left(communityResult.value);
        }

        createdEntityId = communityResult.value.id.value;

        break;
      }
      case RequestType.CAUSE: {
        const causeResult = await this.causesService.create(requestEventDto as CauseRequestEventDto);
        if (causeResult.isLeft()) {
          return left(causeResult.value);
        }

        createdEntityId = causeResult.value.id.value;
        break;
      }
      case RequestType.ACTION: {
        const actionResult = await this.actionsService.create(requestEventDto as ActionRequestEventDto);
        if (actionResult.isLeft()) {
          return left(actionResult.value);
        }

        createdEntityId = actionResult.value.id.value;
        break;
      }
      default:
        return left(new ValidationError('Invalid request type'));
    }

    await this.eventBus.publish(
      new RequestStatusChangedEvent({
        id: request.id.value,
        userId: request.user.id.value,
        type: request.type,
        name: request.name,
        description: request.description,
        status: request.status,
        reason: request.reason,
        createdEntityId,
      }),
    );

    return right(undefined);
  }

  async rejectRequest(requestEventDto: RequestEventDto): Promise<Either<ValidationError | RepositoryException, void>> {
    const requestOrError = await this.requestsRepository.findById(requestEventDto.id, ['user']);

    if (requestOrError.isLeft()) {
      return left(requestOrError.value);
    }

    const request: Request<RequestProps> = requestOrError.value;

    const rejectOrError = request.reject(requestEventDto.reason ?? 'No reason provided');

    if (rejectOrError.isLeft()) {
      return left(rejectOrError.value);
    }

    const saveResult = await this.requestsRepository.save(request);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    await this.eventBus.publish(
      new RequestStatusChangedEvent({
        id: request.id.value,
        userId: request.user.id.value,
        type: request.type,
        name: request.name,
        description: request.description,
        status: request.status,
        reason: request.reason,
      }),
    );

    return right(undefined);
  }

  async getRequestById(id: string): Promise<Either<ValidationError | RepositoryException, Request<RequestProps>>> {
    const requestOrError = await this.requestsRepository.findById(id, ['user']);

    if (requestOrError.isLeft()) {
      return left(requestOrError.value);
    }

    return right(requestOrError.value);
  }

  async getRequestsByUserId(
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, Request<RequestProps>[]>> {
    const requestsOrError = await this.requestsRepository.findByUserId(userId);

    if (requestsOrError.isLeft()) {
      return left(requestsOrError.value);
    }

    return right(requestsOrError.value);
  }

  private async syncUserRequestSubscriptions(
    userId: string,
    requestId: string,
  ): Promise<Either<ValidationError | RepositoryException, void>> {
    const subscriptionsOrError = await this.pushSubscriptionRepository.findByUserId(userId);

    if (subscriptionsOrError.isLeft()) {
      return right(undefined);
    }

    if (subscriptionsOrError.value.length === 0) {
      return right(undefined);
    }

    for (const subscription of subscriptionsOrError.value) {
      const resultOrError = subscription.followPendingRequest(requestId);

      if (resultOrError.isLeft()) {
        return left(resultOrError.value);
      }

      const saveResult = await this.pushSubscriptionRepository.save(subscription);

      if (saveResult.isLeft()) {
        return left(saveResult.value);
      }
    }
    return right(undefined);
  }
}
