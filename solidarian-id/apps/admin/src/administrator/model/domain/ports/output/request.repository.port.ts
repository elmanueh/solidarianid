import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';

/**
 * Port for Request repository operations.
 */
export abstract class RequestsRepositoryPort extends Repository<Request<any>> {
  abstract findRequestsByStatusAndType(
    status: RequestStatus,
    type: RequestType,
  ): Promise<Either<RepositoryException, Request<any>[]>>;
}
