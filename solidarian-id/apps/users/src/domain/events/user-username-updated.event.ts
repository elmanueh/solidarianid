import { DomainEvent } from '@app/ddd/domain-event';

export class UserUsernameUpdatedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = UserUsernameUpdatedEvent.name;
  public readonly id: string;

  constructor(
    userId: string,
    public readonly username: string,
  ) {
    this.id = userId;
  }
}
