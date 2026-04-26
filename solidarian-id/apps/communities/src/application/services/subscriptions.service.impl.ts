import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { EventsRepositoryPort } from '@app/communities/domain/ports/events.repository.port';
import { ObjectivesRepositoryPort } from '@app/communities/domain/ports/objectives.repository.port';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { SubscriptionsRepositoryPort } from '@app/communities/domain/ports/subscription.repository.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import {
  SubscriptionsSearchCriteria,
  SubscriptionsService,
} from '@app/communities/domain/services/subscriptions.service';
import { UserSubscriptionsResponseDto } from '@app/communities/infrastructure/presentation/dtos/output/user-subscriptions.response.dto';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionsServiceImpl extends SubscriptionsService {
  constructor(
    private readonly requestsRepository: RequestsRepositoryPort,
    private readonly usersRepository: UsersRepositoryPort,
    private readonly communitiesRepository: CommunitiesRepositoryPort,
    private readonly causesRepository: CausesRepositoryPort,
    private readonly eventsRepository: EventsRepositoryPort,
    private readonly objectivesRepository: ObjectivesRepositoryPort,
    private readonly subscriptionsRepository: SubscriptionsRepositoryPort,
  ) {
    super();
  }

  async getUserSubscriptions(
    userId: string,
    criteria: SubscriptionsSearchCriteria = {},
  ): Promise<Either<ValidationError | RepositoryException, UserSubscriptionsResponseDto>> {
    const userOrError = await this.usersRepository.findById(userId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const includeRequestIds = criteria.includeRequestIds ?? true;
    const includeFollowedCauseIds = criteria.includeFollowedCauseIds ?? true;
    const includeFollowedCommunityIds = criteria.includeFollowedCommunityIds ?? true;
    const includeEventIds = criteria.includeEventIds ?? true;
    const includeObjectiveIds = criteria.includeObjectiveIds ?? true;
    const statusFilter = criteria.requestStatus ?? RequestStatus.PENDING;
    const typeFilter = criteria.requestType;

    let requestIds: string[] = [];
    if (includeRequestIds) {
      const requestsOrError = await this.getRequestsByCriteria(userId, typeFilter);
      requestIds = requestsOrError.isLeft()
        ? []
        : requestsOrError.value.filter(req => req.status === statusFilter).map(req => req.id.value);
    }

    let followedCauseIds: string[] = [];
    if (includeFollowedCauseIds) {
      const causesOrError = await this.causesRepository.findAllFollowedCauseIdsByUserId(userId);
      followedCauseIds = causesOrError.isLeft() ? [] : causesOrError.value;
    }

    let followedCommunityIds: string[] = [];
    if (includeFollowedCommunityIds) {
      const communitiesOrError = await this.communitiesRepository.findAllFollowedCommunityIdsByUserId(userId);
      followedCommunityIds = communitiesOrError.isLeft() ? [] : communitiesOrError.value;
    }

    const eventIdsOrError = includeEventIds ? await this.eventsRepository.findAllEventIdsByUserId(userId) : right([]);
    const eventIds = eventIdsOrError.isLeft() ? [] : eventIdsOrError.value;

    const objectiveIdsOrError = includeObjectiveIds
      ? await this.objectivesRepository.findAllObjectiveIdsByUserId(userId)
      : right([]);
    const objectiveIds = objectiveIdsOrError.isLeft() ? [] : objectiveIdsOrError.value;

    return right({
      requestIds,
      followedCauseIds,
      followedCommunityIds,
      eventIds,
      objectiveIds,
    });
  }

  private async getRequestsByCriteria(userId: string, requestType?: RequestType) {
    if (!requestType) {
      return await this.requestsRepository.findByUserId(userId);
    }

    return await this.requestsRepository.findByUserIdAndType(userId, requestType);
  }

  async pushSubscription(
    userId: string,
    endpoint: string,
    p256dh: string,
    auth: string,
  ): Promise<Either<ValidationError | RepositoryException, Subscription>> {
    const subscription = Subscription.create({ userId, endpoint, p256dh, auth });

    if (subscription.isLeft()) {
      return left(subscription.value);
    }

    await this.subscriptionsRepository.save(subscription.value);
    return right(subscription.value);
  }

  async deleteSubscription(endpoint: string, userId: string): Promise<Either<RepositoryException, void>> {
    const deleteResult = await this.subscriptionsRepository.deleteByEndpointAndUserId(endpoint, userId);
    if (deleteResult.isLeft()) {
      return left(deleteResult.value);
    }
    return right(undefined);
  }
}
