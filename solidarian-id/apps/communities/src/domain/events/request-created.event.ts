import { ActionRequest } from '@app/communities/domain/model/entities/request-action';
import { CauseRequest } from '@app/communities/domain/model/entities/request-cause';
import { CommunityRequest } from '@app/communities/domain/model/entities/request-community';
import { CommunitiesDomainEvent } from './domain-event';

export type CreatedRequest = CommunityRequest | CauseRequest | ActionRequest;

export class RequestCreatedEvent implements CommunitiesDomainEvent {
  readonly eventName = 'REQUEST_CREATED';
  readonly occurredOn = new Date();
  readonly id: string;

  constructor(readonly request: CreatedRequest) {
    this.id = request.id.value;
  }
}
