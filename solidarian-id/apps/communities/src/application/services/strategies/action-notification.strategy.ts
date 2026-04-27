import { NotificationStrategy } from '@app/communities/application/services/strategies/notification.strategy';
import { SubscriptionPayload } from '@app/communities/application/services/web-push.service.impl';
import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { PushSubscriptionRepositoryPort } from '@app/communities/domain/ports/push-subscription.repository.port';
import { ActionWebPushNotification, WebPushNotification } from '@app/communities/domain/ports/web-push-sender.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionNotificationStrategy implements NotificationStrategy {
  constructor(
    private readonly subscriptionRepository: PushSubscriptionRepositoryPort,
    private readonly causesrepository: CausesRepositoryPort,
  ) {}

  canHandle(event: WebPushNotification): boolean {
    return event.eventType === 'ACTION';
  }

  async execute(event: WebPushNotification): Promise<[Subscription[], SubscriptionPayload | undefined]> {
    if (!this.canHandle(event)) {
      return [[], undefined];
    }

    const actionEvent = event as ActionWebPushNotification;

    const subscriptions = await this.subscriptionRepository.findByCauseId(actionEvent.causeId);

    if (subscriptions.isLeft()) {
      return [[], undefined];
    }

    const causeOrError = await this.causesrepository.findById(actionEvent.causeId);

    if (causeOrError.isLeft()) {
      return [[], undefined];
    }

    return [
      subscriptions.value,
      {
        title: `Mira tus acciones`,
        message: `Se ha creado una nueva acción en una de tus causas`,
        createdAt: new Date(),
        type: 'ACTION',
        data: {
          communityId: causeOrError.value.communityId,
          causeId: actionEvent.causeId,
          actionId: actionEvent.id,
        },
      },
    ];
  }
}
