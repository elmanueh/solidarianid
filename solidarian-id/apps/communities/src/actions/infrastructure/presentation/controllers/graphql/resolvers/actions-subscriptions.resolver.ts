/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/entities/action';
import { ActionsGraphqlMapper } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';
import {
  ACTION_CREATED_TOPIC,
  GRAPHQL_PUB_SUB,
} from '@app/communities/communities/infrastructure/presentation/controllers/graphql/subscriptions/community.subscription';
import { Action as ActionDomain } from '@app/communities/shared/domain/model/aggregates/action';
import { CausesService } from '@app/communities/shared/domain/services/causes.service';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';

type ActionCreatedPayload = {
  actionCreated?: ActionDomain;
};

@Resolver(() => Action)
export class ActionsSubscriptionsResolver {
  constructor(
    @Inject(GRAPHQL_PUB_SUB) private readonly pubSub: PubSubEngine,
    private readonly causesService: CausesService,
  ) {}

  @Subscription(() => Action, {
    filter: (payload: ActionCreatedPayload, variables: { causeId: string }): boolean => {
      const action = payload?.actionCreated;
      if (!action) return false;
      return action.causeId === variables.causeId;
    },
    resolve(this: ActionsSubscriptionsResolver, payload: ActionCreatedPayload): Promise<Action> {
      return this.resolveActionCreatedPayload(payload);
    },
  })
  actionCreated(@Args('causeId', { type: () => ID }, new ParseUUIDPipe()) causeId: string) {
    return this.pubSub.asyncIterableIterator(ACTION_CREATED_TOPIC);
  }

  private async resolveActionCreatedPayload(payload: ActionCreatedPayload): Promise<Action> {
    const action = payload?.actionCreated;

    if (!action) {
      throw new Error('No action created payload');
    }

    const causeOrError = await this.causesService.getById(action.causeId);

    if (causeOrError.isLeft()) {
      throw causeOrError.value;
    }

    return ActionsGraphqlMapper.toActionFromDomain(action, causeOrError.value.communityId);
  }
}
