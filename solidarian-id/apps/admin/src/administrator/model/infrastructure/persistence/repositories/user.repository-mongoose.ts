import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryMongoose } from '@app/ddd/repository/repository-mongoose';
import {
  UserRepositoryPort,
  PaginatedResult,
} from '@app/admin/administrator/model/domain/ports/output/user.repository.port';
import { User } from '@app/admin/administrator/model/domain/models/user';
import { UserDocument, UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

@Injectable()
export class UserRepositoryMongoose
  extends RepositoryMongoose<User, UserEntity>
  implements UserRepositoryPort
{
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userMapper: UserMapper,
  ) {
    super(userModel, userMapper);
  }

  async findPaginated(
    page: number,
    limit: number,
  ): Promise<Either<RepositoryException, PaginatedResult<User>>> {
    try {
      if (page < 1) {
        return left(new RepositoryException('Page must be greater than 0'));
      }
      if (limit < 1) {
        return left(new RepositoryException('Limit must be greater than 0'));
      }

      const total = await this.userModel.countDocuments();
      const totalPages = Math.ceil(total / limit);
      const skip = (page - 1) * limit;

      const documents = await this.userModel
        .find()
        .skip(skip)
        .limit(limit)
        .lean();

      const userEntities: User[] = [];
      for (const doc of documents) {
        const userOrError = this.userMapper.fromPersistence(doc as UserEntity);
        if (userOrError.isLeft()) {
          return left(
            new RepositoryException(
              'Failed to map user entity.',
              userOrError.value,
            ),
          );
        }
        userEntities.push(userOrError.value);
      }

      const result: PaginatedResult<User> = {
        data: userEntities,
        total,
        page,
        limit,
        totalPages,
      };

      return right(result);
    } catch (error) {
      return left(
        new RepositoryException('Failed to find paginated users.', error),
      );
    }
  }

  async countAll(): Promise<number> {
    return this.userModel.countDocuments();
  }
}
