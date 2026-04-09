import { DomainEvent } from '@app/ddd/domain-event';

export class UserFullNameUpdatedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = UserFullNameUpdatedEvent.name;
  public readonly id: string;

  constructor(
    userId: string,
    public readonly fullName: string,
  ) {
    this.id = userId;
  }
}
