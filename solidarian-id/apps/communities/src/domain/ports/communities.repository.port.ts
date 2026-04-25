import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Community } from '../model/aggregates/community';

export abstract class CommunitiesRepositoryPort extends Repository<Community> {
  abstract findAllFollowedCommunityIdsByUserId(userId: string): Promise<Either<RepositoryException, string[]>>;
  abstract findAllByMemberId(
    userId: string,
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Community[]>>;
  abstract findAllByIds(
    ids: string[],
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Community[]>>;

  abstract removeMember(
    communityId: string,
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, void>>;
}
