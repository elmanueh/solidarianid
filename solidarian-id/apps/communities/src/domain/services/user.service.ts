import { User } from '@app/communities/domain/model/entities/user';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UserEventDto } from '@solidarianid/kafka';

export abstract class UserService {
  abstract createUser(user: UserEventDto): Promise<Either<ValidationError | RepositoryException, User>>;
  abstract updateUser(user: UserEventDto): Promise<Either<ValidationError | RepositoryException, User>>;
}
