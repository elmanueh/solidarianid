import { UserPermissionError } from '@app/communities/domain/errors/user-permission.error';
import { CausesQueryRepositoryPort } from '@app/communities/domain/ports/causes-query.repository.port';
import { CausesPublisherPort } from '@app/communities/domain/ports/causes.publisher.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { SubscriptionsRepositoryPort } from '@app/communities/domain/ports/subscription.repository.port';
import { SubscriptionsPublisherPort } from '@app/communities/domain/ports/subscriptions-publisher.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { CausesService } from '@app/communities/domain/services/causes.service';
import { Either, left, right } from '@app/ddd/either';
import { ConflictError } from '@app/ddd/errors/conflict-error';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { CauseRequestEventDto, EventType } from '@solidarianid/kafka';
import { ExploreCauseData } from '../../application/services/explore-cause.data';
import { ExploreCausesCriteria } from '../../application/services/explore-causes.criteria';
import { ExplorePaginatedResultData } from '../../application/services/explore-paginated-result.data';
import { Cause } from '../../domain/model/entities/cause';
import { CausesRepositoryPort } from '../../domain/ports/causes.repository.port';

@Injectable()
export class CausesServiceImpl implements CausesService {
  constructor(
    private readonly causeRepository: CausesRepositoryPort,
    private readonly causesQueryRepository: CausesQueryRepositoryPort,
    private readonly usersRepository: UsersRepositoryPort,
    private readonly communitiesRepository: CommunitiesRepositoryPort,
    private readonly causesPublisher: CausesPublisherPort,
    private readonly subscriptionsPublisher: SubscriptionsPublisherPort,
    private readonly subscriptionsRepository: SubscriptionsRepositoryPort,
  ) {}

  async create(causeEventDto: CauseRequestEventDto): Promise<Either<ValidationError | RepositoryException, Cause>> {
    const causeOrError = Cause.create(
      {
        name: causeEventDto.name,
        description: causeEventDto.description,
        initialDate: new Date(causeEventDto.initialDate),
        durationDays: causeEventDto.durationDays,
        ods: causeEventDto.ods,
        actions: [],
        communityId: causeEventDto.communityId,
        userIds: [causeEventDto.userId],
      },
      causeEventDto.id,
    );

    if (causeOrError.isLeft()) {
      return left(causeOrError.value);
    }

    const saveResult = await this.causeRepository.save(causeOrError.value);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    await this.causesPublisher.publish(EventType.CAUSE_CREATED, causeOrError.value);
    await this.subscriptionsPublisher.publishCauseCreated(causeOrError.value);

    return right(causeOrError.value);
  }

  async getAll(): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
    return await this.causeRepository.findAll(['users']);
  }

  async getExploreCauses(
    criteria: ExploreCausesCriteria,
  ): Promise<Either<ValidationError | RepositoryException, ExplorePaginatedResultData<ExploreCauseData>>> {
    return await this.causesQueryRepository.findExplore(criteria);
  }

  async getById(id: string, relations?: string[]): Promise<Either<ValidationError | RepositoryException, Cause>> {
    return await this.causeRepository.findById(id, relations || ['users']);
  }

  async getUserFollowedCauses(userId: string): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
    const userOrError = await this.usersRepository.findById(userId);

    if (userOrError.isLeft()) {
      if (userOrError.value instanceof EntityNotFoundException) {
        return left(new EntityNotFoundException('User', userId));
      }

      return left(userOrError.value);
    }

    return await this.causeRepository.findAllByFollowerId(userId, ['users']);
  }

  async getAllByCommunityIds(
    communityIds: string[],
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
    return await this.causeRepository.findAllByCommunityIds(communityIds, relations);
  }

  async getAllByCommunityId(
    communityId: string,
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
    return await this.causeRepository.findAllByCommunityId(communityId, relations);
  }

  async getByCommunityIdAndCauseId(
    communityId: string,
    causeId: string,
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Cause>> {
    const causeOrError = await this.causeRepository.findByCommunityIdAndCauseId(communityId, causeId, relations);

    if (causeOrError.isLeft()) {
      return left(causeOrError.value);
    }

    return right(causeOrError.value);
  }

  async joinCause(causeId: string, userId: string): Promise<Either<ValidationError | RepositoryException, void>> {
    const causeOrError = await this.causeRepository.findById(causeId, ['users']);

    if (causeOrError.isLeft()) {
      return left(causeOrError.value);
    }

    const userOrError = await this.usersRepository.findById(userId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    if (causeOrError.value.hasFollower(userId)) {
      return left(new ConflictError('User is already following the cause'));
    }

    const communityOrError = await this.communitiesRepository.findById(causeOrError.value.communityId, [
      'members',
      'members.user',
    ]);

    if (communityOrError.isLeft()) {
      return left(communityOrError.value);
    }

    if (!communityOrError.value.hasMember(userOrError.value)) {
      return left(new UserPermissionError('User must be a member of the community to support the cause'));
    }

    const addFollowerResult = causeOrError.value.addFollower(userId);

    if (addFollowerResult.isLeft()) {
      return left(addFollowerResult.value);
    }

    const saveResult = await this.causeRepository.save(causeOrError.value);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    const subscriptionSyncResult = await this.syncUserCauseSubscriptions(userId, causeId, 'add');

    if (subscriptionSyncResult.isLeft()) {
      return left(subscriptionSyncResult.value);
    }

    return right(undefined);
  }

  async leaveCause(causeId: string, userId: string): Promise<Either<ValidationError | RepositoryException, void>> {
    const causeOrError = await this.causeRepository.findById(causeId, ['users']);

    if (causeOrError.isLeft()) {
      return left(causeOrError.value);
    }

    if (!causeOrError.value.hasFollower(userId)) {
      return left(new ConflictError('User is not following the cause'));
    }

    const removeResult = await this.causeRepository.removeFollower(causeId, userId);

    if (removeResult.isLeft()) {
      return left(removeResult.value);
    }

    const subscriptionSyncResult = await this.syncUserCauseSubscriptions(userId, causeId, 'remove');

    if (subscriptionSyncResult.isLeft()) {
      return left(subscriptionSyncResult.value);
    }

    return right(undefined);
  }

  private async syncUserCauseSubscriptions(
    userId: string,
    causeId: string,
    action: 'add' | 'remove',
  ): Promise<Either<ValidationError | RepositoryException, void>> {
    const subscriptionsOrError = await this.subscriptionsRepository.findByUserId(userId);

    if (subscriptionsOrError.isLeft()) {
      return left(subscriptionsOrError.value);
    }

    for (const subscription of subscriptionsOrError.value) {
      const mutationResult = action === 'add' ? subscription.followCause(causeId) : subscription.unfollowCause(causeId);

      if (mutationResult.isLeft()) {
        return left(mutationResult.value);
      }

      const saveResult = await this.subscriptionsRepository.save(subscription);

      if (saveResult.isLeft()) {
        return left(saveResult.value);
      }
    }

    return right(undefined);
  }
}
