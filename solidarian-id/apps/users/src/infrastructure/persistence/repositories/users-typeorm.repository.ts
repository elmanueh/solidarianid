import { Injectable } from '@nestjs/common';
import { UsersRepositoryPort } from '@app/users/domain/ports/users.repository.port';
import { User } from '@app/users/domain/model/user';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UserMapper } from '@app/users/infrastructure/persistence/mappers/user.mapper';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Username } from '@app/value-objects/model/username';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';

@Injectable()
export class UsersRepositoryTypeORM extends RepositoryTypeORM<User, UserEntity> implements UsersRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: TypeOrmRepository<UserEntity>,
    private readonly userMapper: UserMapper,
  ) {
    super(usersRepository, userMapper);
  }

  async existsByMobilePhone(
    mobilePhone: string,
    excludeUserId?: string,
  ): Promise<Either<RepositoryException, boolean>> {
    try {
      const where: Record<string, any> = { mobilePhone: mobilePhone };
      if (excludeUserId) {
        where.id = Not(excludeUserId);
      }
      const count = await this.usersRepository.count({
        where,
      });

      return right(count > 0);
    } catch (error) {
      return left(new RepositoryException(`Failed to check if mobile phone exists: ${error}`));
    }
  }

  async existsByUsername(username: string, excludeUserId?: string): Promise<Either<RepositoryException, boolean>> {
    try {
      const where: Record<string, any> = { username: username };
      if (excludeUserId) {
        where.id = Not(excludeUserId);
      }
      const count = await this.usersRepository.count({
        where,
      });

      return right(count > 0);
    } catch (error) {
      return left(new RepositoryException(`Failed to check if username exists: ${error}`));
    }
  }

  async findByUsername(username: string): Promise<Either<RepositoryException | ValidationError, User>> {
    try {
      const userEntity = await this.usersRepository.findOne({
        where: { username: username },
      });
      if (!userEntity) {
        return left(new EntityNotFoundException(Username.name, 'User not found'));
      }
      return this.userMapper.fromPersistence(userEntity);
    } catch (error) {
      return left(new RepositoryException(`Failed to find user by username: ${error}`));
    }
  }
}
