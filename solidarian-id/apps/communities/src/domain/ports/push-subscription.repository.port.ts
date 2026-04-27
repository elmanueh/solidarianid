import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class PushSubscriptionRepositoryPort extends Repository<Subscription> {
  abstract findByUserId(userId: string): Promise<Either<RepositoryException | ValidationError, Subscription[]>>;
  abstract findByCommunityId(
    communityId: string,
  ): Promise<Either<RepositoryException | ValidationError, Subscription[]>>;
  abstract findByCauseId(causeId: string): Promise<Either<RepositoryException | ValidationError, Subscription[]>>;
  abstract deleteByEndpointAndUserId(endpoint: string, userId: string): Promise<Either<RepositoryException, void>>;
}
