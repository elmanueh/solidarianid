import { Cause } from '@app/communities/domain/model/entities/cause';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { CauseRequestEventDto } from '@solidarianid/kafka';

export abstract class CausesService {
  abstract getAll(): Promise<Either<ValidationError | RepositoryException, Cause[]>>;
  abstract getById(id: string, relations?: string[]): Promise<Either<ValidationError | RepositoryException, Cause>>;
  abstract getAllByCommunityIds(
    communityIds: string[],
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>>;
  abstract getAllByCommunityId(
    communityId: string,
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>>;
  abstract getByCommunityIdAndCauseId(
    communityId: string,
    causeId: string,
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Cause>>;
  abstract create(causeEventDto: CauseRequestEventDto): Promise<Either<ValidationError | RepositoryException, Cause>>;
  abstract joinCause(causeId: string, userId: string): Promise<Either<ValidationError | RepositoryException, void>>;
  abstract leaveCause(causeId: string, userId: string): Promise<Either<ValidationError | RepositoryException, void>>;
}
