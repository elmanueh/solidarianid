import { DomainEvent } from '@app/ddd/domain-event';
import { DomainEvents } from '@app/ddd/domain-events';
import { UserCreatedEvent } from '@app/users/domain/events/user-created.event';
import { UserFullNameUpdatedEvent } from '@app/users/domain/events/user-fullname-updated.event';
import { UserLocationUpdatedEvent } from '@app/users/domain/events/user-location-updated.event';
import { UserMobilePhoneUpdatedEvent } from '@app/users/domain/events/user-mobile-phone-updated.event';
import { UserPreferencesUpdatedEvent } from '@app/users/domain/events/user-preferences-updated.event';
import { UserUsernameUpdatedEvent } from '@app/users/domain/events/user-username-updated.event';
import { UsersPublisherPort } from '@app/users/domain/ports/users.publisher.port';
import { UsersRepositoryPort } from '@app/users/domain/ports/users.repository.port';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class UsersDomainEvents implements OnModuleInit {
  constructor(
    private readonly domainEvents: DomainEvents,
    private readonly usersRepository: UsersRepositoryPort,
    private readonly usersPublisher: UsersPublisherPort,
  ) {}

  private readonly pendingUsers = new Map<string, EventType>();
  private flushScheduled = false;

  onModuleInit() {
    this.domainEvents.registerGlobal(event => this.onEvent(event));
  }

  private onEvent(event: DomainEvent): void {
    const eventType = this.mapEvent(event);
    if (!eventType) return;

    const userId = event.id;

    if (eventType === EventType.USER_CREATED) {
      this.pendingUsers.set(userId, EventType.USER_CREATED);
    } else if (!this.pendingUsers.has(userId)) {
      this.pendingUsers.set(userId, EventType.USER_UPDATED);
    }

    this.scheduleFlush();
  }

  private scheduleFlush(): void {
    if (this.flushScheduled) return;

    this.flushScheduled = true;
    queueMicrotask(() => {
      void this.flush();
    });
  }

  private async flush(): Promise<void> {
    const entries = Array.from(this.pendingUsers.entries());
    this.pendingUsers.clear();
    this.flushScheduled = false;

    for (const [userId, eventType] of entries) {
      const userOrError = await this.usersRepository.findById(userId);
      if (userOrError.isLeft()) continue;

      await this.usersPublisher.publish(eventType, userOrError.value);
    }
  }

  private mapEvent(event: DomainEvent): EventType | null {
    switch (event.type) {
      case UserCreatedEvent.name:
        return EventType.USER_CREATED;
      case UserFullNameUpdatedEvent.name:
      case UserUsernameUpdatedEvent.name:
      case UserMobilePhoneUpdatedEvent.name:
      case UserLocationUpdatedEvent.name:
      case UserPreferencesUpdatedEvent.name:
        return EventType.USER_UPDATED;
      default:
        return null;
    }
  }
}
