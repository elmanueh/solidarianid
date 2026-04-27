import { NotificationStrategy } from '@app/communities/application/services/strategies/notification.strategy';
import { SubscriptionPayload } from '@app/communities/application/services/web-push.service.impl';
import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { PushSubscriptionRepositoryPort } from '@app/communities/domain/ports/push-subscription.repository.port';
import { WebPushNotification } from '@app/communities/domain/ports/web-push-sender.port';
import { Injectable } from '@nestjs/common';

type RequestStatusChangedWebPushNotification = Extract<WebPushNotification, { eventType: 'REQUEST_STATUS_CHANGED' }>;

@Injectable()
export class RequestNotificationStrategy implements NotificationStrategy {
  constructor(private readonly subscriptionRepository: PushSubscriptionRepositoryPort) {}

  canHandle(event: WebPushNotification): boolean {
    return event.eventType === 'REQUEST_STATUS_CHANGED';
  }

  async execute(event: WebPushNotification): Promise<[Subscription[], SubscriptionPayload | undefined]> {
    if (!this.canHandle(event)) {
      return [[], undefined];
    }

    const requestEvent = event as RequestStatusChangedWebPushNotification;

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
