import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { SubscriptionsService } from '@app/communities/domain/services/subscriptions.service';
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
  ) {
    super();
  }

  async getUserSubscriptions(
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, UserSubscriptionsResponseDto>> {
    const userOrError = await this.usersRepository.findById(userId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const requestsOrError = await this.requestsRepository.findByUserId(userId);
    const pendingRequestIds = requestsOrError.isLeft()
      ? []
      : requestsOrError.value.filter(req => req.status === RequestStatus.PENDING).map(req => req.id.value);

    const causesOrError = await this.causesRepository.findAll(['users']);
    const followedCauseIds = causesOrError.isLeft()
      ? []
      : causesOrError.value.filter(cause => cause.userIds.includes(userId)).map(cause => cause.id.value);

    const communitiesOrError = await this.communitiesRepository.findAll(['members', 'members.user']);
    const followedCommunityIds = communitiesOrError.isLeft()
      ? []
      : communitiesOrError.value
          .filter(community => community.members.some(member => member.id.value === userId))
          .map(community => community.id.value);

    return right({
      pendingRequestIds,
      followedCauseIds,
      followedCommunityIds,
    });
  }
}
