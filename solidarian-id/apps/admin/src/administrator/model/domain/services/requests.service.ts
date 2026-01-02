import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestAction } from '@app/admin/administrator/model/domain/models/action.request';
import { RequestCause } from '@app/admin/administrator/model/domain/models/cause.request';
import { RequestCommunity } from '@app/admin/administrator/model/domain/models/community.request';
import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class RequestsService {
  abstract updateStatus(
    id: string,
    status: RequestStatus,
    reason?: string,
  ): Promise<Either<ValidationError, void>>;

  abstract getPendingCommunityRequests(): Promise<
    Either<ValidationError, RequestCommunity[]>
  >;

  abstract getPendingCauseRequests(): Promise<
    Either<ValidationError, RequestCause[]>
  >;

  abstract getPendingActionRequests(): Promise<
    Either<ValidationError, RequestAction[]>
  >;
}
