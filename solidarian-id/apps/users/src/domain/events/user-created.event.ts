import { DomainEvent } from '@app/ddd/domain-event';

export class UserCreatedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = UserCreatedEvent.name;
  public readonly id: string;

  constructor(
    userId: string,
    public readonly fullName: string,
    public readonly username: string,
    public readonly mobilePhone: string,
    public readonly passwordHash: string,
    public readonly city: string,
    public readonly countryCode: string,
    public readonly preferredSDGs: number[],
    public readonly preferredCategories: string[],
    public readonly durationPreferences: string[],
    public readonly notificationsEnabled: boolean,
  ) {
    this.id = userId;
  }
}
