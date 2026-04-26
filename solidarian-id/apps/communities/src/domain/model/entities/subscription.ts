import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { sequence } from '../../../../../../libs/ddd/src/either';

export interface SubscriptionProps {
  id: UniqueEntityID;
  userId: UniqueEntityID;
  endpoint: string;
  p256dh: string;
  auth: string;
  createdAt: Date;
  communityFollowedIds: UniqueEntityID[];
  causeFollowedIds: UniqueEntityID[];
}

interface SubscriptionCreationProps {
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  createdAt?: Date;
  communityFollowedIds?: string[];
  causeFollowedIds?: string[];
}

export class Subscription extends Entity<SubscriptionProps> {
  private constructor(props: SubscriptionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get userId(): string {
    return this.props.userId.value;
  }

  get endpoint(): string {
    return this.props.endpoint;
  }

  get p256dh(): string {
    return this.props.p256dh;
  }

  get auth(): string {
    return this.props.auth;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get communityFollowedIds(): string[] {
    return this.props.communityFollowedIds.map(id => id.value);
  }

  get causeFollowedIds(): string[] {
    return this.props.causeFollowedIds.map(id => id.value);
  }

  followCommunity(communityId: string): Either<ValidationError, void> {
    const communityUniqueId = UniqueEntityID.create(communityId);

    if (communityUniqueId.isLeft()) {
      return left(communityUniqueId.value);
    }

    if (!this.props.communityFollowedIds.some(currentId => currentId.value === communityId)) {
      this.props.communityFollowedIds.push(communityUniqueId.value);
    }

    return right(undefined);
  }

  unfollowCommunity(communityId: string): Either<ValidationError, void> {
    const communityUniqueId = UniqueEntityID.create(communityId);

    if (communityUniqueId.isLeft()) {
      return left(communityUniqueId.value);
    }

    this.props.communityFollowedIds = this.props.communityFollowedIds.filter(
      currentId => currentId.value !== communityId,
    );

    return right(undefined);
  }

  followCause(causeId: string): Either<ValidationError, void> {
    const causeUniqueId = UniqueEntityID.create(causeId);

    if (causeUniqueId.isLeft()) {
      return left(causeUniqueId.value);
    }

    if (!this.props.causeFollowedIds.some(currentId => currentId.value === causeId)) {
      this.props.causeFollowedIds.push(causeUniqueId.value);
    }

    return right(undefined);
  }

  unfollowCause(causeId: string): Either<ValidationError, void> {
    const causeUniqueId = UniqueEntityID.create(causeId);

    if (causeUniqueId.isLeft()) {
      return left(causeUniqueId.value);
    }

    this.props.causeFollowedIds = this.props.causeFollowedIds.filter(currentId => currentId.value !== causeId);

    return right(undefined);
  }

  static create(props: SubscriptionCreationProps, id?: string): Either<ValidationError, Subscription> {
    const uniqueId = UniqueEntityID.create(id);

    if (uniqueId.isLeft()) {
      return left(uniqueId.value);
    }

    const userId = UniqueEntityID.create(props.userId);

    if (userId.isLeft()) {
      return left(userId.value);
    }

    const communitiesIdOrError = sequence(props.communityFollowedIds?.map(id => UniqueEntityID.create(id)));

    if (communitiesIdOrError.isLeft()) {
      return left(communitiesIdOrError.value);
    }

    const causesIdOrError = sequence(props.causeFollowedIds?.map(id => UniqueEntityID.create(id)));

    if (causesIdOrError.isLeft()) {
      return left(causesIdOrError.value);
    }

    return right(
      new Subscription(
        {
          id: uniqueId.value,
          userId: userId.value,
          endpoint: props.endpoint,
          p256dh: props.p256dh,
          auth: props.auth,
          createdAt: props.createdAt ?? new Date(),
          communityFollowedIds: communitiesIdOrError.value,
          causeFollowedIds: causesIdOrError.value,
        },
        uniqueId.value,
      ),
    );
  }
}
