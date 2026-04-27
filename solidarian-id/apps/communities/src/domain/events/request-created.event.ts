import { ActionRequest } from '@app/communities/domain/model/entities/request-action';
import { CauseRequest } from '@app/communities/domain/model/entities/request-cause';
import { CommunityRequest } from '@app/communities/domain/model/entities/request-community';
import { DomainEvent } from '@app/ddd/domain-event';

export type CreatedRequest = CommunityRequest | CauseRequest | ActionRequest;

export class RequestCreatedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = RequestCreatedEvent.name;
  public readonly id: string;

  constructor(readonly request: CreatedRequest) {
    this.id = request.id.value;
  }
}
