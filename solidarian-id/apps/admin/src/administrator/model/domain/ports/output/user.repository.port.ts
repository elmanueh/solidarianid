import { Either } from '@app/ddd/either';
import { User } from '../../models/user';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';
import { PaginatedResult } from '@app/admin/administrator/model/domain/value-objects/paginated-result';

export abstract class UserRepositoryPort extends Repository<User> {
  abstract findPaginated(page: number, limit: number): Promise<Either<RepositoryException, PaginatedResult<User>>>;
  abstract countAll(): Promise<Either<RepositoryException, number>>;
}
