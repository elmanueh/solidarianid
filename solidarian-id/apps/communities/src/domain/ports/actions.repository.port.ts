import { Repository } from '@app/ddd/repository/repository';
import { Action } from '../model/entities/action';
import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class ActionsRepositoryPort extends Repository<Action> {
  abstract findAllByCauseIds(causeIds: string[]): Promise<Either<ValidationError | RepositoryException, Action[]>>;
}
