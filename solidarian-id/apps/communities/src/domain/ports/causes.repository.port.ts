import { Cause } from '@app/communities/domain/model/entities/cause';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class CausesRepositoryPort extends Repository<Cause> {
  abstract findAllFollowedCauseIdsByUserId(userId: string): Promise<Either<RepositoryException, string[]>>;
  abstract findAllByCommunityIds(
    communityIds: string[],
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>>;
  abstract findAllByCommunityId(
    communityId: string,
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>>;
  abstract findByCommunityIdAndCauseId(
    communityId: string,
    causeId: string,
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Cause>>;
  abstract removeFollower(
    causeId: string,
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, void>>;
}
