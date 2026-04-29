import {
  GRAPHQL_PUB_SUB,
  REQUEST_STATUS_CHANGED_TOPIC,
} from '@app/communities/communities/infrastructure/presentation/controllers/graphql/subscriptions/community.subscription';
import { RequestStatusChangedEvent } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/entities/request-status-changed-event';

import { RequestStatusChangedPayload } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/subscriptions/request-status-changed.payload';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';

@Resolver(() => RequestStatusChangedEvent)
export class RequestSubscriptionsResolver {
  constructor(@Inject(GRAPHQL_PUB_SUB) private readonly pubSub: PubSubEngine) {}

  @Subscription(() => RequestStatusChangedEvent, {
    filter: (payload: { requestStatusChanged: RequestStatusChangedPayload }, variables: { userId: string }): boolean =>
      payload.requestStatusChanged.userId === variables.userId,
    resolve: (payload: { requestStatusChanged: RequestStatusChangedPayload }): RequestStatusChangedEvent => {
      const event: RequestStatusChangedEvent = payload.requestStatusChanged;

      return event;
    },
  })
  requestStatusChanged(@Args('userId', { type: () => ID }, new ParseUUIDPipe()) userId: string) {
    void userId;
    return this.pubSub.asyncIterableIterator(REQUEST_STATUS_CHANGED_TOPIC);
  }
}
