import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export abstract class RequestsServicePort {
  abstract updateStatus(
    id: string,
    status: RequestStatus,
    reason?: string,
  ): Promise<Either<ValidationError, void>>;
}
