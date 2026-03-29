import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either } from '@app/ddd/either';
import { Action } from '../model/entities/action';
import { ActionRequestEventDto } from '@solidarianid/kafka';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class ActionsService {
  abstract getActions(): Promise<Either<ValidationError, Action[]>>;
  abstract getActionById(id: string): Promise<Either<ValidationError, Action>>;
  abstract getByCauseIds(causeIds: string[]): Promise<Either<ValidationError, Action[]>>;
  abstract create(actionDto: ActionRequestEventDto): Promise<Either<ValidationError | RepositoryException, Action>>;
}
