import { SubscriptionPayload } from '@app/communities/application/services/web-push.service.impl';
import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { NotificationEvent } from '@app/communities/domain/services/notification.service';

export interface NotificationStrategy {
  canHandle(event: NotificationEvent): boolean;

  execute(event: NotificationEvent): Promise<[Subscription[], SubscriptionPayload | undefined]>;
}
