import { Either } from '@app/ddd/either';
import { Repository } from '@app/ddd/repository/repository';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Community } from 'apps/communities/src/domain/model/entities/community';

export abstract class CommunitiesRepositoryPort extends Repository<Community> {
  abstract getAllCommunitiesSummary(): Promise<
    Either<ValidationError, Community[]>
  >;
}
