import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { RequestsPublisherPort } from '@app/admin/administrator/model/domain/ports/output/request.publisher.port';
import { EventType } from '@solidarianid/kafka';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RequestError } from '@app/value-objects/errors/validation/request-validation.error';

@Injectable()
export class RequestsServiceImpl extends RequestsService {
  constructor(
    private readonly repository: RequestsRepositoryPort,
    private readonly publisher: RequestsPublisherPort,
  ) {
    super();
  }

  async updateStatus(
    id: string,
    status: RequestStatus,
    reason?: string,
  ): Promise<Either<RepositoryException | ValidationError, void>> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const requestOrError = await this.repository.findById(id);
    if (requestOrError.isLeft()) {
      return left(requestOrError.value);
    }

    const request = requestOrError.value;

    const applyStatus = (): Either<ValidationError, void> => {
      switch (status) {
        case RequestStatus.APPROVED:
          return request.approve(reason);
        case RequestStatus.REJECTED:
          return request.reject(reason!);
        default:
          return left(new RequestError('Invalid status provided'));
      }
    };

    const statusResult = applyStatus();
    if (statusResult.isLeft()) return left(statusResult.value);

    await this.repository.save(request);

    const eventType = RequestStatus.APPROVED ? EventType.REQUEST_ACCEPTED : EventType.REQUEST_DECLINED;
    await this.publisher.publish(eventType, request);

    return right(undefined);
  }
}
