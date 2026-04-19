import { UserSubscriptionsResponseDto } from '@app/communities/infrastructure/presentation/dtos/output/user-subscriptions.response.dto';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class SubscriptionsService {
  abstract getUserSubscriptions(
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, UserSubscriptionsResponseDto>>;
}
