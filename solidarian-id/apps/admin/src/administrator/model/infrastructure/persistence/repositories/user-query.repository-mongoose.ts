import { Either, left, right } from '@app/ddd/either';
import { UserQueryRepositoryPort } from '../../../domain/ports/output/user-query.repository.port';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { UserGroupByCountryData } from '../../../application/data/user-group-by-country.data';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserEntity } from '../entities/user.entity';

@Injectable()
export class UserQueryMongooseRepository implements UserQueryRepositoryPort {
  constructor(@InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>) {}
  async findUsersGroupByCountry(limit: number = 6): Promise<Either<RepositoryException, UserGroupByCountryData[]>> {
    let usersGrouped: UserGroupByCountryData[];
    try {
      usersGrouped = await this.userModel.aggregate<UserGroupByCountryData>([
        { $group: { _id: '$location.countryCode', userCount: { $sum: 1 } } },
        { $sort: { userCount: -1 } },
        { $project: { _id: 0, country: '$_id', userCount: 1 } },
        { $limit: limit },
      ]);
    } catch (error) {
      return left(new RepositoryException('Failed to retrieve users grouped by country', error));
    }
    return right(usersGrouped);
  }
}
