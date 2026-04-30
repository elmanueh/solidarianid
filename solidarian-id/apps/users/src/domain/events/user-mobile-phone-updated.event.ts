import { DomainEvent } from '@app/ddd/domain-event';

export class UserMobilePhoneUpdatedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = UserMobilePhoneUpdatedEvent.name;
  public readonly id: string;

  constructor(
    userId: string,
    public readonly mobilePhone: string,
  ) {
    this.id = userId;
  }
}
