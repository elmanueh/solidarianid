import { DomainEvent } from '@app/ddd/domain-event';

export class UserPreferencesUpdatedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = UserPreferencesUpdatedEvent.name;
  public readonly id: string;

  constructor(
    userId: string,
    public readonly preferredSDGs: number[],
    public readonly preferredCategories: string[],
    public readonly durationPreferences: string[],
    public readonly notificationsEnabled: boolean,
  ) {
    this.id = userId;
  }
}
