import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Community } from '../model/aggregates/community';
import { CommunityRequestEventDto } from '@solidarianid/kafka';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class CommunitiesService {
  abstract getCommunities(): Promise<Either<ValidationError, Community[]>>;
  abstract getCommunityById(id: string): Promise<Either<ValidationError, Community>>;
  abstract create(
    communityDto: CommunityRequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, Community>>;
}
