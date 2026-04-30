import {
  ACTION_CREATED_TOPIC,
  CAUSE_CREATED_TOPIC,
  GRAPHQL_PUB_SUB,
  REQUEST_STATUS_CHANGED_TOPIC,
} from '@app/communities/communities/infrastructure/presentation/controllers/graphql/subscriptions/community.subscription';
import { ActionCreatedEvent } from '@app/communities/shared/domain/events/action-created.event';
import { CauseCreatedEvent } from '@app/communities/shared/domain/events/cause-created.event';
import { RequestStatusChangedEvent } from '@app/communities/shared/domain/events/request-status-changed.event';
import { RealtimeNotificationsPublisherPort } from '@app/communities/shared/domain/ports/realtime-notifications.publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

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
