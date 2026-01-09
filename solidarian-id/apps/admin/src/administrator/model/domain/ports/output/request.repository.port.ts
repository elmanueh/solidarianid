import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { PaginatedResult } from '@app/admin/administrator/model/domain/value-objects/paginated-result';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';

/**
 * Port for Request repository operations.
 */
export abstract class RequestsRepositoryPort extends Repository<Request<any>> {
  abstract findPendingCommunityRequests(
    page: number,
    limit: number,
  ): Promise<Either<RepositoryException, PaginatedResult<CommunityRequest>>>;

  abstract findPendingCauseRequests(
    page: number,
    limit: number,
  ): Promise<Either<RepositoryException, PaginatedResult<CauseRequest>>>;

  abstract findPendingActionRequests(
    page: number,
    limit: number,
  ): Promise<Either<RepositoryException, PaginatedResult<ActionRequest>>>;
}
