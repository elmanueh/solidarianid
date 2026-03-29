import { Repository } from '@app/ddd/repository/repository';
import { Community } from '../model/aggregates/community';
import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class CommunitiesRepositoryPort extends Repository<Community> {
  abstract findAllByIds(
    ids: string[],
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Community[]>>;
}
