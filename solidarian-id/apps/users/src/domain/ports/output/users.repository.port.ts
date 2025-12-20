import { Repository } from '@app/ddd/repository/repository';
import { User } from '@app/users/domain/model/user';
import { Either } from '@app/ddd/either';
import { RepositoryError } from '../../errors/repository-error';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { Username } from '@app/value-objects/model/username';

export abstract class UsersRepositoryPort extends Repository<User> {
  abstract existsByMobilePhone(
    mobilePhone: MobilePhone,
  ): Promise<Either<RepositoryError, boolean>>;

  abstract existsByUsername(
    username: Username,
  ): Promise<Either<RepositoryError, boolean>>;
}
