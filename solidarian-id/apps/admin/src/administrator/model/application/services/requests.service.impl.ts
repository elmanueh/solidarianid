import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { RequestAction } from '@app/admin/administrator/model/domain/models/action.request';
import { RequestCause } from '@app/admin/administrator/model/domain/models/cause.request';
import { RequestCommunity } from '@app/admin/administrator/model/domain/models/community.request';
import {
  fakeCommunityRequests,
  fakeCauseRequests,
  fakeActionRequests,
} from '@app/admin/administrator/model/data/fakeRequest';

@Injectable()
export class RequestsServiceImpl extends RequestsService {
  constructor(private readonly requestsRepository: RequestsRepositoryPort) {
    super();
  }

  async updateStatus(
    id: string,
    status: RequestStatus,
    reason?: string,
  ): Promise<Either<ValidationError, void>> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const requestOrError = await this.requestsRepository.findById(id);
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
          return left(new ValidationError('Invalid status provided'));
      }
    };

    const statusResult = applyStatus();
    if (statusResult.isLeft()) return left(statusResult.value);

    await this.requestsRepository.save(request);
    return right(undefined);
  }

  getPendingCommunityRequests(): Promise<
    Either<ValidationError, RequestCommunity[]>
  > {
    return Promise.resolve(
      right(fakeCommunityRequests as unknown as RequestCommunity[]),
    );
  }

  getPendingCauseRequests(): Promise<Either<ValidationError, RequestCause[]>> {
    return Promise.resolve(
      right(fakeCauseRequests as unknown as RequestCause[]),
    );
  }

  getPendingActionRequests(): Promise<
    Either<ValidationError, RequestAction[]>
  > {
    return Promise.resolve(
      right(fakeActionRequests as unknown as RequestAction[]),
    );
  }
}
