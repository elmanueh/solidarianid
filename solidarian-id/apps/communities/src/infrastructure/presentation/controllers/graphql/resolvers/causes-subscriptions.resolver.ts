/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cause as CauseDomain } from '@app/communities/domain/model/aggregates/cause';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import { Args, ID, Resolver, Subscription } from '@nestjs/graphql';
import { Cause } from '../entities/cause';
import { CausesGraphqlMapper } from '../mappers/causes-graphql.mapper';
import { CAUSE_CREATED_TOPIC, GRAPHQL_PUB_SUB } from '../subscriptions/community.subscription';

@Resolver(() => Cause)
export class CausesSubscriptionsResolver {
  constructor(@Inject(GRAPHQL_PUB_SUB) private readonly pubSub: PubSubEngine) {}

  @Subscription(() => Cause, {
    filter: (payload: { causeCreated: CauseDomain }, variables: { communityId: string }): boolean =>
      payload.causeCreated.communityId === variables.communityId,
    resolve: (payload: { causeCreated: CauseDomain }): Cause =>
      CausesGraphqlMapper.toCauseBaseFromDomain(payload.causeCreated),
  })
  causeCreated(@Args('communityId', { type: () => ID }, new ParseUUIDPipe()) communityId: string) {
    return this.pubSub.asyncIterableIterator(CAUSE_CREATED_TOPIC);
  }
}
