import { Injectable } from '@nestjs/common';
import { UsersRepositoryPort } from '@app/users/domain/ports/users.repository.port';
import { User } from '@app/users/domain/model/user';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UserMapper } from '@app/users/infrastructure/persistence/mappers/user.mapper';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { Username } from '@app/value-objects/model/username';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';

@Injectable()
export class UsersRepositoryTypeORM
  extends RepositoryTypeORM<User, UserEntity>
  implements UsersRepositoryPort
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: TypeOrmRepository<UserEntity>,
    private readonly userMapper: UserMapper,
  ) {
    super(usersRepository, userMapper);
  }

  async existsByMobilePhone(
    mobilePhone: MobilePhone,
  ): Promise<Either<RepositoryException, boolean>> {
    try {
      // Realizar la consulta a la base de datos
      const count = await this.usersRepository.count({
        where: { mobilePhone: mobilePhone.value },
      });

      // Devolver true si existe, false si no
      return right(count > 0);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error checking mobile phone';

      return left(
        new RepositoryException(
          `Failed to check if mobile phone exists: ${errorMessage}`,
        ),
      );
    }
  }

  async existsByUsername(
    username: Username,
  ): Promise<Either<RepositoryException, boolean>> {
    try {
      // Realizar la consulta a la base de datos
      const count = await this.usersRepository.count({
        where: { username: username.value },
      });

      // Devolver true si existe, false si no
      return right(count > 0);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error checking username';

      return left(
        new RepositoryException(
          `Failed to check if username exists: ${errorMessage}`,
        ),
      );
    }
  }

  async findByUsername(
    username: Username,
  ): Promise<Either<RepositoryException | ValidationError, User>> {
    try {
      const userEntity = await this.usersRepository.findOne({
        where: { username: username.value },
      });
      if (!userEntity) {
        return left(
          new EntityNotFoundException(Username.name, 'User not found'),
        );
      }
      const user = this.userMapper.fromPersistence(userEntity);
      return right(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error finding user by username';
      return left(
        new RepositoryException(
          `Failed to find user by username: ${errorMessage}`,
        ),
      );
    }
  }
}
