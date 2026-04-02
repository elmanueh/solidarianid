/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action as ActionDomain } from '@app/communities/domain/model/entities/action';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import { Args, ID, Resolver, Subscription } from '@nestjs/graphql';
import { Action } from '../entities/action';
import { ActionsGraphqlMapper } from '../mappers/actions-graphql.mapper';
import { ACTION_CREATED_TOPIC, GRAPHQL_PUB_SUB } from '../subscriptions/community.subscription';

@Resolver(() => Action)
export class ActionsSubscriptionsResolver {
  constructor(@Inject(GRAPHQL_PUB_SUB) private readonly pubSub: PubSubEngine) {}

  @Subscription(() => Action, {
    filter: (payload: { actionCreated: ActionDomain }, variables: { causeId: string }): boolean =>
      payload.actionCreated.causeId === variables.causeId,
    resolve: (payload: { actionCreated: ActionDomain }): Action =>
      ActionsGraphqlMapper.toActionFromDomain(payload.actionCreated),
  })
  actionCreated(@Args('causeId', { type: () => ID }, new ParseUUIDPipe()) causeId: string) {
    return this.pubSub.asyncIterableIterator(ACTION_CREATED_TOPIC);
  }
}
