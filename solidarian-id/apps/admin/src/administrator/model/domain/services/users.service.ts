import { Either } from '@app/ddd/either';
import { User } from '../models/user';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { UserGroupByCountryData } from '../../application/services/data/user-group-by-country.data';
import { PaginatedResult } from '@app/admin/administrator/model/domain/value-objects/paginated-result';
import { UserEventDto } from '@solidarianid/kafka';
import { CreateCommunityMembershipProps } from '../value-objects/community-membership';

export abstract class UsersService {
  abstract getPaginatedUsers(page: number, limit: number): Promise<Either<RepositoryException, PaginatedResult<User>>>;

  abstract getUserById(id: string): Promise<Either<RepositoryException, User>>;

  abstract getTotalUsers(): Promise<Either<RepositoryException, number>>;

  abstract getUsersGroupByCountry(limit: number): Promise<Either<RepositoryException, UserGroupByCountryData[]>>;

  abstract createUser(userDto: UserEventDto): Promise<Either<RepositoryException, void>>;

  abstract updateUser(userDto: UserEventDto): Promise<Either<RepositoryException, void>>;

  abstract addMemberShip(
    userId: string,
    props: CreateCommunityMembershipProps,
  ): Promise<Either<RepositoryException, void>>;
}
