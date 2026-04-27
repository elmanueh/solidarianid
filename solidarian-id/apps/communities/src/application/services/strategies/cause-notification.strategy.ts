import { NotificationStrategy } from '@app/communities/application/services/strategies/notification.strategy';
import { SubscriptionPayload } from '@app/communities/application/services/web-push.service.impl';
import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { PushSubscriptionRepositoryPort } from '@app/communities/domain/ports/push-subscription.repository.port';
import {
  CauseWebPushNotification,
  SubscriptionType,
  WebPushNotification,
} from '@app/communities/domain/ports/web-push-sender.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CauseNotificationStrategy implements NotificationStrategy {
  constructor(private readonly subscriptionRepository: PushSubscriptionRepositoryPort) {}

  canHandle(event: WebPushNotification): boolean {
    return event.eventType === SubscriptionType.CAUSE;
  }

  async execute(event: WebPushNotification): Promise<[Subscription[], SubscriptionPayload | undefined]> {
    if (!this.canHandle(event)) {
      return [[], undefined];
    }

    const causeEvent = event as CauseWebPushNotification;

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
