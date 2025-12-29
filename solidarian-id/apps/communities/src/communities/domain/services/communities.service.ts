import { Community } from '@app/communities/communities/domain/model/aggregates/community';
import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class CommunitiesService {
  abstract getCommunities(): Promise<Either<ValidationError, Community[]>>;
}
