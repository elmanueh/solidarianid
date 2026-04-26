import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { PushSubscriptionCreatedResponseDto } from '@app/communities/infrastructure/presentation/dtos/output/push-subscription-created.response.dto';

export class SubscriptionDomainMapper {
  static toSubscriptionDto(subscription: Subscription): PushSubscriptionCreatedResponseDto {
    return {
      id: subscription.id.value,
      endpoint: subscription.endpoint,
      createdAt: subscription.createdAt,
    };
  }
}
