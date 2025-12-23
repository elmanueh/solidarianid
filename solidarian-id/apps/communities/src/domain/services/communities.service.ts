import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Community } from '@app/communities/domain/model/entities/community';

export abstract class CommunitiesService {
  abstract getCommunities(): Promise<Either<ValidationError, Community[]>>;
}
