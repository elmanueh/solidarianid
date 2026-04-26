import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { UserSubscriptionsResponseDto } from '@app/communities/infrastructure/presentation/dtos/output/user-subscriptions.response.dto';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export interface SubscriptionsSearchCriteria {
  requestType?: RequestType;
  requestStatus?: RequestStatus;
  includeRequestIds?: boolean;
  includeFollowedCauseIds?: boolean;
  includeFollowedCommunityIds?: boolean;
  includeEventIds?: boolean;
  includeObjectiveIds?: boolean;
}

export abstract class SubscriptionsService {
  abstract getUserSubscriptions(
    userId: string,
    criteria?: SubscriptionsSearchCriteria,
  ): Promise<Either<ValidationError | RepositoryException, UserSubscriptionsResponseDto>>;

  abstract pushSubscription(
    userId: string,
    endpoint: string,
    p256dh: string,
    auth: string,
  ): Promise<Either<ValidationError | RepositoryException, Subscription>>;

  abstract deleteSubscription(
    endpoint: string,
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, void>>;
}
