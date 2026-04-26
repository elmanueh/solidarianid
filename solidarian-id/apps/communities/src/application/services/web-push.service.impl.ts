import { NotificationStrategy } from '@app/communities/application/services/strategies/notification.strategy';
import { RequestNotificationStrategy } from '@app/communities/application/services/strategies/request-notification.strategy';
import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { NotificationEvent, NotificationServicePort } from '../../domain/services/notification.service';
import { ActionNotificationStrategy } from './strategies/action-notification.strategy';
import { CauseNotificationStrategy } from './strategies/cause-notification.strategy';

export type SubscriptionPayload = {
  title: string;
  message: string;
  createdAt: Date;
  type: string;
  data: {
    communityId?: string;
    causeId?: string;
    actionId?: string;
    requestId?: string;
  };
};

@Injectable()
export class WebPushService extends NotificationServicePort {
  private readonly strategies: NotificationStrategy[];
  private readonly ttlSeconds = 60 * 60;
  private readonly isConfigured: boolean;

  constructor(
    private readonly requestStrategy: RequestNotificationStrategy,
    private readonly causeStrategy: CauseNotificationStrategy,
    private readonly actionStrategy: ActionNotificationStrategy,
  ) {
    super();
    this.strategies = [this.requestStrategy, this.causeStrategy, this.actionStrategy] as NotificationStrategy[];

    const vapidSubject = process.env.VAPID_SUBJECT;
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

    if (!vapidSubject || !vapidPublicKey || !vapidPrivateKey) {
      this.isConfigured = false;

      if (process.env.NODE_ENV === 'test') {
        return;
      }

      throw new Error('Missing VAPID configuration for WebPushService.');
    }

    this.isConfigured = true;
    webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
  }

  async sendNotification(event: NotificationEvent) {
    if (!this.isConfigured) {
      return;
    }

    const strategy = this.strategies.find(s => s.canHandle(event));

    if (!strategy) {
      return;
    }

    const [subscriptions, payload] = await strategy.execute(event);

    if (!payload) {
      return;
    }

    const payloadJson = JSON.stringify(payload);

    await Promise.allSettled(
      subscriptions.map(subscription =>
        webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          payloadJson,
          {
            TTL: this.ttlSeconds,
          },
        ),
      ),
    );
  }
}
