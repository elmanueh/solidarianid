import { NotificationStrategy } from '@app/communities/application/services/strategies/notification.strategy';
import { SubscriptionPayload } from '@app/communities/application/services/web-push.service.impl';
import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { SubscriptionsRepositoryPort } from '@app/communities/domain/ports/subscription.repository.port';
import { CauseNotificationEvent, NotificationEvent } from '@app/communities/domain/services/notification.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CauseNotificationStrategy implements NotificationStrategy {
  constructor(private readonly subscriptionRepository: SubscriptionsRepositoryPort) {}

  canHandle(event: NotificationEvent): boolean {
    return event.eventType === 'CAUSE';
  }

  async execute(event: NotificationEvent): Promise<[Subscription[], SubscriptionPayload | undefined]> {
    if (!this.canHandle(event)) {
      return [[], undefined];
    }

    const causeEvent = event as CauseNotificationEvent;

    const subscriptions = await this.subscriptionRepository.findByCommunityId(causeEvent.communityId);

    if (subscriptions.isLeft()) {
      return [[], undefined];
    }

    return [
      subscriptions.value,
      {
        title: `Mira tus causas`,
        message: `Se ha creado una nueva causa en una de tus comunidades`,
        createdAt: new Date(),
        type: 'CAUSE',
        data: {
          communityId: causeEvent.communityId,
          causeId: causeEvent.id,
        },
      },
    ];
  }
}
