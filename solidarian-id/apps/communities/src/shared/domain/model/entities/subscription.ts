import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { sequence } from '../../../../../../../libs/ddd/src/either';

export interface SubscriptionProps {
  userId: UniqueEntityID;
  endpoint: string;
  p256dh: string;
  auth: string;
  createdAt: Date;
  requestIds: UniqueEntityID[];
  followedCommunityIds: UniqueEntityID[];
  followedCauseIds: UniqueEntityID[];
}

interface SubscriptionCreationProps {
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  createdAt?: Date;
  requestIds?: string[];
  followedCommunityIds?: string[];
  followedCauseIds?: string[];
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

  get followedCommunityIds(): string[] {
    return this.props.followedCommunityIds.map(id => id.value);
  }

  get followedCauseIds(): string[] {
    return this.props.followedCauseIds.map(id => id.value);
  }

  get requestIds(): string[] {
    return this.props.requestIds?.map(id => id.value) ?? [];
  }

  followPendingRequest(requestId: string): Either<ValidationError, void> {
    const requestUniqueId = UniqueEntityID.create(requestId);

    if (requestUniqueId.isLeft()) {
      return left(requestUniqueId.value);
    }

    if (!this.props.requestIds?.some(currentId => currentId.value === requestId)) {
      this.props.requestIds = [...(this.props.requestIds ?? []), requestUniqueId.value];
    }

    return right(undefined);
  }

  unfollowPendingRequest(requestId: string): Either<ValidationError, void> {
    const requestUniqueId = UniqueEntityID.create(requestId);

    if (requestUniqueId.isLeft()) {
      return left(requestUniqueId.value);
    }

    this.props.requestIds = this.props.requestIds?.filter(currentId => currentId.value !== requestId);

    return right(undefined);
  }

  followCommunity(communityId: string): Either<ValidationError, void> {
    const communityUniqueId = UniqueEntityID.create(communityId);

    if (communityUniqueId.isLeft()) {
      return left(communityUniqueId.value);
    }

    if (!this.props.followedCommunityIds.some(currentId => currentId.value === communityId)) {
      this.props.followedCommunityIds.push(communityUniqueId.value);
    }

    return right(undefined);
  }

  unfollowCommunity(communityId: string): Either<ValidationError, void> {
    const communityUniqueId = UniqueEntityID.create(communityId);

    if (communityUniqueId.isLeft()) {
      return left(communityUniqueId.value);
    }

    this.props.followedCommunityIds = this.props.followedCommunityIds.filter(
      currentId => currentId.value !== communityId,
    );

    return right(undefined);
  }

  followCause(causeId: string): Either<ValidationError, void> {
    const causeUniqueId = UniqueEntityID.create(causeId);

    if (causeUniqueId.isLeft()) {
      return left(causeUniqueId.value);
    }

    if (!this.props.followedCauseIds.some(currentId => currentId.value === causeId)) {
      this.props.followedCauseIds.push(causeUniqueId.value);
    }

    return right(undefined);
  }

  unfollowCause(causeId: string): Either<ValidationError, void> {
    const causeUniqueId = UniqueEntityID.create(causeId);

    if (causeUniqueId.isLeft()) {
      return left(causeUniqueId.value);
    }

    this.props.followedCauseIds = this.props.followedCauseIds.filter(currentId => currentId.value !== causeId);

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

    const requestPendingFollowedIdsOrError = sequence(props.requestIds?.map(id => UniqueEntityID.create(id)));

    if (requestPendingFollowedIdsOrError.isLeft()) {
      return left(requestPendingFollowedIdsOrError.value);
    }

    const communitiesIdOrError = sequence(props.followedCommunityIds?.map(id => UniqueEntityID.create(id)));

    if (communitiesIdOrError.isLeft()) {
      return left(communitiesIdOrError.value);
    }

    const causesIdOrError = sequence(props.followedCauseIds?.map(id => UniqueEntityID.create(id)));

    if (causesIdOrError.isLeft()) {
      return left(causesIdOrError.value);
    }

    return right(
      new Subscription(
        {
          userId: userId.value,
          endpoint: props.endpoint,
          p256dh: props.p256dh,
          auth: props.auth,
          createdAt: props.createdAt ?? new Date(),
          requestIds: requestPendingFollowedIdsOrError.value,
          followedCommunityIds: communitiesIdOrError.value,
          followedCauseIds: causesIdOrError.value,
        },
        uniqueId.value,
      ),
    );
  }
}
