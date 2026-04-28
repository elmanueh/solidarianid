import { Cause } from '@app/communities/causes/infrastructure/presentation/controllers/graphql/entities/cause';
import { CausesGraphqlMapper } from '@app/communities/causes/infrastructure/presentation/controllers/graphql/mappers/causes-graphql.mapper';
import {
  CAUSE_CREATED_TOPIC,
  GRAPHQL_PUB_SUB,
} from '@app/communities/communities/infrastructure/presentation/controllers/graphql/subscriptions/community.subscription';
import { Cause as CauseDomain } from '@app/communities/shared/domain/model/aggregates/cause';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';

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
