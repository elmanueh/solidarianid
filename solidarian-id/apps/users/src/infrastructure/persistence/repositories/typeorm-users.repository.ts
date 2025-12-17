import { Injectable } from '@nestjs/common';
import { UsersRepositoryPort } from '@app/users/domain/ports/out/users.repository.port';
import { User } from '@app/users/domain/model/user';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UserMapper } from '@app/users/infrastructure/persistence/mappers/user.mapper';
import { AppDataSource } from '@app/users/infrastructure/persistence/config/data-source';

@Injectable()
export class TypeOrmUsersRepository extends UsersRepositoryPort {
  async save(user: User): Promise<void> {
    const entity = UserMapper.toPersistence(user);
    const repository = AppDataSource.getRepository(UserEntity);
    await repository.save(entity);
  }
}
