import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Cause } from '../model/entities/cause';

export abstract class CausesService {
  abstract getCauses(): Promise<Either<ValidationError, Cause[]>>;
  abstract getCauseById(id: string): Promise<Either<ValidationError, Cause>>;
}
