import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { UserGroupByCountryData } from '../../../application/data/user-group-by-country.data';

export abstract class UserQueryRepositoryPort {
  abstract findUsersGroupByCountry(limit: number): Promise<Either<RepositoryException, UserGroupByCountryData[]>>;
}
