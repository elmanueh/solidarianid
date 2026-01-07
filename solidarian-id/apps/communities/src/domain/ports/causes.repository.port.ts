import { Repository } from '@app/ddd/repository/repository';
import { Cause } from '../model/entities/cause';
import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class CausesRepositoryPort extends Repository<Cause> {
  abstract findAllByCommunityId(
    communityId: string,
    actions?: boolean,
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>>;
  abstract findByCommunityIdAndCauseId(
    communityId: string,
    causeId: string,
    actions?: boolean,
  ): Promise<Either<ValidationError | RepositoryException, Cause>>;
}
