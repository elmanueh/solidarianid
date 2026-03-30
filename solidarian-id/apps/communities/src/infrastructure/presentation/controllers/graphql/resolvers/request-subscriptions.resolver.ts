/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import { Args, ID, Resolver, Subscription } from '@nestjs/graphql';
import { GRAPHQL_PUB_SUB, REQUEST_STATUS_CHANGED_TOPIC } from '../subscriptions/community.subscription';
import type { RequestStatusChangedPayload } from '../subscriptions/request-status-changed.payload';
import { RequestStatusChangedEvent } from '../entities/request-status-changed-event';

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
    return this.pubSub.asyncIterableIterator(REQUEST_STATUS_CHANGED_TOPIC);
  }
}
