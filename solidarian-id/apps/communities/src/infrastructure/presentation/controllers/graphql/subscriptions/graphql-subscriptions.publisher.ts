import { Action } from '@app/communities/domain/model/entities/action';
import { Cause } from '@app/communities/domain/model/entities/cause';
import {
  SubscriptionsPublisherPort,
  RequestStatusChanged,
} from '@app/communities/domain/ports/subscriptions-publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import {
  GRAPHQL_PUB_SUB,
  ACTION_CREATED_TOPIC,
  CAUSE_CREATED_TOPIC,
  REQUEST_STATUS_CHANGED_TOPIC,
} from './community.subscription';

@Injectable()
export class GraphqlSubscriptionsPublisherAdapter extends SubscriptionsPublisherPort {
  constructor(@Inject(GRAPHQL_PUB_SUB) private readonly pubSub: PubSubEngine) {
    super();
  }

  async publishCauseCreated(cause: Cause): Promise<void> {
    await this.pubSub.publish(CAUSE_CREATED_TOPIC, { causeCreated: cause });
  }

  async publishActionCreated(action: Action): Promise<void> {
    await this.pubSub.publish(ACTION_CREATED_TOPIC, { actionCreated: action });
  }

  async publishRequestStatusChanged(event: RequestStatusChanged): Promise<void> {
    await this.pubSub.publish(REQUEST_STATUS_CHANGED_TOPIC, { requestStatusChanged: event });
  }
}
