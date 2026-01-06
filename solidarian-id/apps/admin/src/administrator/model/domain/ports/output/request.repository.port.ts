import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';

/**
 * Port for Request repository operations.
 */
export abstract class RequestsRepositoryPort extends Repository<Request<any>> {
  abstract findPendingCommunityRequests(): Promise<Either<RepositoryException, CommunityRequest[]>>;

  abstract findPendingCauseRequests(): Promise<Either<RepositoryException, CauseRequest[]>>;

  abstract findPendingActionRequests(): Promise<Either<RepositoryException, ActionRequest[]>>;
}
