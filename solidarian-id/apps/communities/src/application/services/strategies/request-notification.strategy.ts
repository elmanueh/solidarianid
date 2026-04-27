import { NotificationStrategy } from '@app/communities/application/services/strategies/notification.strategy';
import { SubscriptionPayload } from '@app/communities/application/services/web-push.service.impl';
import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { SubscriptionsRepositoryPort } from '@app/communities/domain/ports/subscription.repository.port';
import { RequestStatusChanged } from '@app/communities/domain/ports/subscriptions-publisher.port';
import { NotificationEvent } from '@app/communities/domain/services/notification.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestNotificationStrategy implements NotificationStrategy {
  constructor(private readonly subscriptionRepository: SubscriptionsRepositoryPort) {}

  canHandle(event: NotificationEvent): boolean {
    return event.eventType === 'REQUEST_STATUS_CHANGED';
  }

  async execute(event: NotificationEvent): Promise<[Subscription[], SubscriptionPayload | undefined]> {
    if (!this.canHandle(event)) {
      return [[], undefined];
    }

    const requestEvent = event as RequestStatusChanged;

    const subscriptions = await this.subscriptionRepository.findByUserId(requestEvent.userId);

    if (subscriptions.isLeft()) {
      return [[], undefined];
    }

    const estado = requestEvent.status === RequestStatus.APPROVED ? 'aprobada' : 'rechazada';

    return [
      subscriptions.value,
      {
        title: `Solitud ${estado}`,
        message: `Revisa tus solicitudes`,
        createdAt: new Date(),
        type: 'REQUEST_STATUS_CHANGED',
        data: {
          requestId: requestEvent.id,
        },
      },
    ];
  }
}
