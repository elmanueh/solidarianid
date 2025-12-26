import { RequestAlreadyResolvedException } from '@app/admin/administrator/model/domain/exceptions/already-resolved.request.exception';
import { RequestsServicePort } from '@app/admin/administrator/model/domain/interfaces/requests.service.port';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestsRepository } from '@app/admin/administrator/model/infrastructure/persistence/request.repository';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

@Injectable()
export class RequestsService extends RequestsServicePort {
  constructor(private readonly requestsRepository: RequestsRepository) {
    super();
  }

  async updateStatus(
    id: string,
    status: RequestStatus,
    reason?: string,
  ): Promise<Either<ValidationError, void>> {
    const uniqueIdOrError = UniqueEntityID.create(id);
    if (uniqueIdOrError.isLeft()) {
      return left(new ValidationError('Invalid request ID format'));
    }
    const requestOrError = await this.requestsRepository.findById(id);
    if (requestOrError.isLeft()) {
      return left(requestOrError.value);
    }

    const request = requestOrError.value;
    if (request.status !== RequestStatus.PENDING) {
      return left(new RequestAlreadyResolvedException(id));
    }

    if (status === RequestStatus.APPROVED) {
      request.approve(reason);
    }
    if (status === RequestStatus.REJECTED && reason) {
      request.reject(reason);
    } else if (status === RequestStatus.REJECTED && !reason) {
      return left(new ValidationError('Rejection reason must be provided'));
    }

    await this.requestsRepository.save(request);
    return right(undefined);
  }
}
