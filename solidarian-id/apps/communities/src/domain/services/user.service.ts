import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UserEventDto } from 'libs/kafka/src/dtos/user.event.dto';
import { User } from '../model/entities/user';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class UserService {
  abstract createUser(user: UserEventDto): Promise<Either<ValidationError | RepositoryException, User>>;
  abstract updateUser(user: UserEventDto): Promise<Either<ValidationError | RepositoryException, User>>;
}
