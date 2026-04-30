import { Subscription } from '@app/communities/shared/domain/model/entities/subscription';
import { PushSubscriptionCreatedResponseDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/output/push-subscription-created.response.dto';

export class SubscriptionDomainMapper {
  static toSubscriptionDto(subscription: Subscription): PushSubscriptionCreatedResponseDto {
    return {
      id: subscription.id.value,
      endpoint: subscription.endpoint,
      createdAt: subscription.createdAt,
    };
  }
}
