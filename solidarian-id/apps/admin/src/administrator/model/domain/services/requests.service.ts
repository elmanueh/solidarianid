import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class RequestsService {
  abstract updateStatus(
    id: string,
    status: RequestStatus,
    reason?: string,
  ): Promise<Either<RepositoryException | ValidationError, void>>;
}
