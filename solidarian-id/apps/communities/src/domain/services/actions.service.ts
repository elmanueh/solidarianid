import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either } from '@app/ddd/either';
import { Action } from '../model/entities/action';

export abstract class ActionsService {
  abstract getActions(): Promise<Either<ValidationError, Action[]>>;
  abstract getActionById(id: string): Promise<Either<ValidationError, Action>>;
}
