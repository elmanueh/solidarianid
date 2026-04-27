/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action as ActionDomain } from '@app/communities/domain/model/entities/action';
import { CausesService } from '@app/communities/domain/services/causes.service';
import { NotificationServicePort } from '@app/communities/domain/services/notification.service';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { Action } from '../entities/action';
import { ActionsGraphqlMapper } from '../mappers/actions-graphql.mapper';
import { ACTION_CREATED_TOPIC, GRAPHQL_PUB_SUB } from '../subscriptions/community.subscription';

type ActionCreatedPayload = {
  actionCreated?: ActionDomain;
};

@Resolver(() => Action)
export class ActionsSubscriptionsResolver {
  constructor(
    @Inject(GRAPHQL_PUB_SUB) private readonly pubSub: PubSubEngine,
    private readonly causesService: CausesService,
    private readonly webPushService: NotificationServicePort,
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
