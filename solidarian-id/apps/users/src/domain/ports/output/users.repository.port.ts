import { Repository } from '@app/ddd/repository/repository';
import { User } from '@app/users/domain/model/user';
import { Either } from '@app/ddd/either';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { Username } from '@app/value-objects/model/username';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class UsersRepositoryPort extends Repository<User> {
  abstract existsByMobilePhone(
    mobilePhone: MobilePhone,
  ): Promise<Either<RepositoryException, boolean>>;

  abstract existsByUsername(
    username: Username,
  ): Promise<Either<RepositoryException, boolean>>;
}
