import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action.request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause.request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community.request';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class RequestsService {
  abstract updateStatus(
    id: string,
    status: RequestStatus,
    reason?: string,
  ): Promise<Either<RepositoryException | ValidationError, void>>;

  abstract getPendingCommunityRequests(): Promise<Either<ValidationError, CommunityRequest[]>>;

  abstract getPendingCauseRequests(): Promise<Either<ValidationError, CauseRequest[]>>;

  abstract getPendingActionRequests(): Promise<Either<ValidationError, ActionRequest[]>>;
}
