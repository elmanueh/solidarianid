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

  constructor(
    private readonly requestStrategy: RequestNotificationStrategy,
    private readonly causeStrategy: CauseNotificationStrategy,
    private readonly actionStrategy: ActionNotificationStrategy,
  ) {
    super();
    this.strategies = [this.requestStrategy, this.causeStrategy, this.actionStrategy] as NotificationStrategy[];
    webpush.setVapidDetails(process.env.VAPID_SUBJECT!, process.env.VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!);
  }

  async sendNotification(event: NotificationEvent) {
    const strategy = this.strategies.find(s => s.canHandle(event));

    if (!strategy) {
      return;
    }

    const [subscriptions, payload] = await strategy.execute(event);

    if (!payload) {
      return;
    }

    await Promise.all(
      subscriptions.map(subscription =>
        webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          JSON.stringify(payload),
        ),
      ),
    );
  }
}
