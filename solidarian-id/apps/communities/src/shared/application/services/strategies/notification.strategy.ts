import { SubscriptionPayload } from '@app/communities/shared/application/services/web-push.service.impl';
import { Subscription } from '@app/communities/shared/domain/model/entities/subscription';
import { WebPushNotification } from '@app/communities/shared/domain/ports/web-push-sender.port';

export interface NotificationStrategy {
  canHandle(event: WebPushNotification): boolean;

  execute(event: WebPushNotification): Promise<[Subscription[], SubscriptionPayload | undefined]>;
}
