import { Either } from '@app/ddd/either';
import { Repository } from '@app/ddd/repository/repository';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Community } from '@app/communities/domain/model/aggregates/community';

export abstract class CommunitiesRepositoryPort extends Repository<Community> {
  abstract getAllCommunitiesSummary(): Promise<
    Either<ValidationError, Community[]>
  >;
}
