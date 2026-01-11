import { Repository } from '@app/ddd/repository/repository';
import { User } from '@app/users/domain/model/user';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class UsersRepositoryPort extends Repository<User> {
  abstract existsByMobilePhone(
    mobilePhone: string,
    excludeUserId?: string,
  ): Promise<Either<RepositoryException, boolean>>;

  abstract existsByUsername(username: string, excludeUserId?: string): Promise<Either<RepositoryException, boolean>>;

  abstract findByUsername(username: string): Promise<Either<RepositoryException | ValidationError, User>>;
}
