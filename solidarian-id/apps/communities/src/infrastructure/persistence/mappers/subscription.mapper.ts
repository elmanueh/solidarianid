import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { SubscriptionEntity } from '@app/communities/infrastructure/persistence/entities/subscription.entity';
import { Either } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionMapper extends Mapper<Subscription, SubscriptionEntity> {
  toPersistence(model: Subscription): SubscriptionEntity {
    const entity = new SubscriptionEntity();
    entity.id = model.id.value;
    entity.userId = model.userId;
    entity.endpoint = model.endpoint;
    entity.createdAt = model.createdAt;
    entity.p256dh = model.p256dh;
    entity.auth = model.auth;
    entity.communityFollowedIds = model.communityFollowedIds;
    entity.causeFollowedIds = model.causeFollowedIds;
    return entity;
  }

  fromPersistence(entity: SubscriptionEntity): Either<ValidationError, Subscription> {
    return Subscription.create(
      {
        userId: entity.userId,
        endpoint: entity.endpoint,
        p256dh: entity.p256dh,
        auth: entity.auth,
        createdAt: entity.createdAt,
        communityFollowedIds: entity.communityFollowedIds,
        causeFollowedIds: entity.causeFollowedIds,
      },
      entity.id,
    );
  }
}
