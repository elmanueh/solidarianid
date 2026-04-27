import { Action } from '@app/communities/domain/model/aggregates/action';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class ActionsRepositoryPort extends Repository<Action> {
  abstract findAllByCauseIds(causeIds: string[]): Promise<Either<ValidationError | RepositoryException, Action[]>>;
  abstract findByEventId(eventId: string): Promise<Either<ValidationError | RepositoryException, Action>>;
  abstract removeAssistant(eventId: string, userId: string): Promise<Either<RepositoryException, void>>;
}
