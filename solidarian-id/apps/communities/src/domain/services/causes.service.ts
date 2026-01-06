import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Cause } from '../model/entities/cause';
import { CauseRequestEventDto } from '@solidarianid/kafka';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class CausesService {
  abstract getCauses(): Promise<Either<ValidationError, Cause[]>>;
  abstract getCauseById(id: string): Promise<Either<ValidationError, Cause>>;
  abstract create(causeEventDto: CauseRequestEventDto): Promise<Either<ValidationError | RepositoryException, Cause>>;
}
