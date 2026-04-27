import { ActionCreatedEvent } from '@app/communities/domain/events/action-created.event';
import { CauseCreatedEvent } from '@app/communities/domain/events/cause-created.event';
import { RequestStatusChangedEvent } from '@app/communities/domain/events/request-status-changed.event';
import { RealtimeNotificationsPublisherPort } from '@app/communities/domain/ports/realtime-notifications.publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import {
  ACTION_CREATED_TOPIC,
  CAUSE_CREATED_TOPIC,
  GRAPHQL_PUB_SUB,
  REQUEST_STATUS_CHANGED_TOPIC,
} from './community.subscription';

@Injectable()
export class GraphqlRealtimeNotificationsPublisherAdapter extends RealtimeNotificationsPublisherPort {
  constructor(@Inject(GRAPHQL_PUB_SUB) private readonly pubSub: PubSubEngine) {
    super();
  }

  async publishCauseCreated(event: CauseCreatedEvent): Promise<void> {
    await this.pubSub.publish(CAUSE_CREATED_TOPIC, { causeCreated: event.cause });
  }

  async publishActionCreated(event: ActionCreatedEvent): Promise<void> {
    await this.pubSub.publish(ACTION_CREATED_TOPIC, { actionCreated: event.action });
  }

  async publishRequestStatusChanged(event: RequestStatusChangedEvent): Promise<void> {
    await this.pubSub.publish(REQUEST_STATUS_CHANGED_TOPIC, { requestStatusChanged: event });
  }
}
