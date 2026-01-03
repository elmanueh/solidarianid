import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import {
  ActionRequestEventDto,
  CauseRequestEventDto,
  CommunityRequestEventDto,
  RequestEventDto,
} from '@solidarianid/kafka';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';
import { RequestError } from '@app/admin/administrator/model/domain/errors/request-error';

@Injectable()
export class RequestsServiceImpl extends RequestsService {
  constructor(private readonly repository: RequestsRepositoryPort) {
    super();
  }

  async createRequest(props: RequestEventDto): Promise<Either<RepositoryException | ValidationError, Request<any>>> {
    const result = await this.buildRequest(props);
    if (result.isLeft()) return left(result.value);

    const request = result.value;
    const res = await this.repository.save(request);
    if (res.isLeft()) return left(res.value);

    return right(request);
  }

  private async buildRequest(data: RequestEventDto): Promise<Either<RequestError | ValidationError, Request<any>>> {
    switch (data.type) {
      case RequestType.COMMUNITY:
        return this.buildCommunityRequest(data as CommunityRequestEventDto);
      case RequestType.CAUSE:
        return this.buildCauseRequest(data as CauseRequestEventDto);
      case RequestType.ACTION:
        return this.buildActionRequest(data as ActionRequestEventDto);
      default:
        return left(new RequestError(`Unsupported request type`));
    }
  }

  private async buildActionRequest(data: ActionRequestEventDto): Promise<Either<ValidationError, CauseRequest>> {
    const causeIdOrError = UniqueEntityID.create(data.causeId);
    if (causeIdOrError.isLeft()) return left(causeIdOrError.value);

    const causeOrError = await this.repository.findById(data.causeId);
    if (causeIdOrError.isLeft()) return left(causeIdOrError.value);

    const cause = causeOrError.value as CauseRequest;
    const res = cause.addAction({
      name: data.name,
      description: data.description,
      userId: data.userId,
      objectives: data.objectives.map(objective => {
        return {
          name: objective.name,
          description: objective.description,
          quantity: objective.quantity,
          unit: objective.unit,
        };
      }),
      events: data.events.map(event => {
        return {
          name: event.name,
          description: event.description,
          initialDate: event.initialDate,
          place: {
            direction: event.place.direction,
            city: event.place.city,
            countryCode: event.place.countryCode,
          },
        };
      }),
    });

    if (res.isLeft()) return left(res.value);
    return right(cause);
  }

  private async buildCauseRequest(data: CauseRequestEventDto): Promise<Either<ValidationError, CommunityRequest>> {
    const communityidOrError = UniqueEntityID.create(data.communityId);
    if (communityidOrError.isLeft()) return left(communityidOrError.value);

    const communityOrError = await this.repository.findById(data.communityId);
    if (communityOrError.isLeft()) return left(communityOrError.value);

    const community = communityOrError.value as CommunityRequest;
    const res = community.addCause({
      name: data.name,
      description: data.description,
      startDate: data.initialDate,
      duration: data.durationDays,
      ods: data.ods,
      userId: data.userId,
    });

    if (res.isLeft()) return left(res.value);
    return right(community);
  }

  private buildCommunityRequest(data: CommunityRequestEventDto): Either<ValidationError, CommunityRequest> {
    return CommunityRequest.create({
      name: data.name,
      description: data.description,
      userId: data.userId,
      causes: data.causeRequests.map(cause => {
        return {
          name: cause.name,
          description: cause.description,
          ods: cause.ods,
          userId: data.userId,
          startDate: cause.initialDate,
          duration: cause.durationDays,
        };
      }),
    });
  }

  async updateStatus(
    id: string,
    status: RequestStatus,
    reason?: string,
  ): Promise<Either<RepositoryException | ValidationError, void>> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const requestOrError = await this.repository.findById(id);
    if (requestOrError.isLeft()) return left(requestOrError.value);

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
    return right(undefined);
  }

  async getCommunityRequestsPending(): Promise<Either<ValidationError, CommunityRequest[]>> {
    const communitiesOrError = await this.repository.findRequestsByStatusAndType(
      RequestStatus.PENDING,
      RequestType.COMMUNITY,
    );

    if (communitiesOrError.isLeft()) {
      return left(new ValidationError('Failed to fetch community requests'));
    }

    return right(communitiesOrError.value as CommunityRequest[]);
  }

  async getCauseRequestsPending(): Promise<Either<ValidationError, CauseRequest[]>> {
    const causesOrError = await this.repository.findRequestsByStatusAndType(RequestStatus.PENDING, RequestType.CAUSE);

    if (causesOrError.isLeft()) {
      return left(new ValidationError('Failed to fetch cause requests'));
    }

    return right(causesOrError.value as CauseRequest[]);
  }

  async getActionRequestsPending(): Promise<Either<ValidationError, ActionRequest[]>> {
    const actionsOrError = await this.repository.findRequestsByStatusAndType(RequestStatus.PENDING, RequestType.ACTION);

    if (actionsOrError.isLeft()) {
      return left(new ValidationError('Failed to fetch action requests'));
    }

    return right(actionsOrError.value as ActionRequest[]);
  }
}
