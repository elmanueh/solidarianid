import { NotificationStrategy } from '@app/communities/application/services/strategies/notification.strategy';
import { SubscriptionPayload } from '@app/communities/application/services/web-push.service.impl';
import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { SubscriptionsRepositoryPort } from '@app/communities/domain/ports/subscription.repository.port';
import { ActionNotificationEvent, NotificationEvent } from '@app/communities/domain/services/notification.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionNotificationStrategy implements NotificationStrategy {
  constructor(
    private readonly subscriptionRepository: SubscriptionsRepositoryPort,
    private readonly causesrepository: CausesRepositoryPort,
  ) {}

  canHandle(event: NotificationEvent): boolean {
    return event.eventType === 'ACTION';
  }

  async execute(event: NotificationEvent): Promise<[Subscription[], SubscriptionPayload | undefined]> {
    if (!this.canHandle(event)) {
      return [[], undefined];
    }

    const actionEvent = event as ActionNotificationEvent;

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
