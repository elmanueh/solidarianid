import { Subscription } from '@app/communities/shared/domain/model/entities/subscription';
import { RequestStatus } from '@app/communities/shared/domain/model/enums/request-status';
import { RequestType } from '@app/communities/shared/domain/model/enums/request-type';
import { UserSubscriptionsResponseDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/output/user-subscriptions.response.dto';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export interface PushSubscriptionsSearchCriteria {
  requestType?: RequestType;
  requestStatus?: RequestStatus;
  includeRequestIds?: boolean;
  includeFollowedCauseIds?: boolean;
  includeFollowedCommunityIds?: boolean;
  includeEventIds?: boolean;
  includeObjectiveIds?: boolean;
}

export abstract class PushSubscriptionsService {
  abstract getUserSubscriptions(
    userId: string,
    criteria?: PushSubscriptionsSearchCriteria,
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
