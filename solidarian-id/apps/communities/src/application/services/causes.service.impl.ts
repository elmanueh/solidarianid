import { Injectable } from '@nestjs/common';
import { CausesService } from '../../domain/services/causes.service';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Cause } from '../../domain/model/entities/cause';
import { CausesRepositoryPort } from '../../domain/ports/causes.repository.port';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { CauseRequestEventDto } from '@solidarianid/kafka';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { ConflictError } from '@app/ddd/errors/conflict-error';
import { UserPermissionError } from '@app/communities/domain/errors/user-permission.error';

@Injectable()
export class CausesServiceImpl implements CausesService {
  constructor(
    private readonly causeRepository: CausesRepositoryPort,
    private readonly usersRepository: UsersRepositoryPort,
    private readonly communitiesRepository: CommunitiesRepositoryPort,
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

    return right(causeOrError.value);
  }

  async getAll(): Promise<Either<ValidationError, Cause[]>> {
    return await this.causeRepository.findAll(['users']);
  }

  async getById(id: string): Promise<Either<ValidationError, Cause>> {
    return await this.causeRepository.findById(id, ['actions', 'users']);
  }

  async getAllByCommunityId(communityId: string, actions: boolean = false): Promise<Either<ValidationError, Cause[]>> {
    return await this.causeRepository.findAllByCommunityId(communityId, actions);
  }

  async getByCommunityIdAndCauseId(
    communityId: string,
    causeId: string,
    actions: boolean = false,
  ): Promise<Either<ValidationError | RepositoryException, Cause>> {
    const causeOrError = await this.causeRepository.findByCommunityIdAndCauseId(communityId, causeId, actions);

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

    return right(undefined);
  }
}
