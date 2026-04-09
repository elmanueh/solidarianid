import { DomainEvent } from '@app/ddd/domain-event';

export class UserLocationUpdatedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = UserLocationUpdatedEvent.name;
  public readonly id: string;

  constructor(
    userId: string,
    public readonly city: string,
    public readonly countryCode: string,
  ) {
    this.id = userId;
  }
}
