import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { User } from '@app/communities/domain/model/entities/user';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository as TypeOrmRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntityMapper } from '../mappers/user-entity.mapper';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';

@Injectable()
export class UsersTypeOrmRepositoryAdapter
  extends RepositoryTypeORM<User, UserEntity>
  implements UsersRepositoryPort
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: TypeOrmRepository<UserEntity>,
    private readonly userMapper: UserEntityMapper,
  ) {
    super(userEntityRepository, userMapper);
  }
}
