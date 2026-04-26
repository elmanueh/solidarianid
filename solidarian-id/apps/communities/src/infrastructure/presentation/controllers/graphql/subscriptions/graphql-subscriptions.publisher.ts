import { Action } from '@app/communities/domain/model/entities/action';
import { Cause } from '@app/communities/domain/model/entities/cause';
import {
  RequestStatusChanged,
  SubscriptionsPublisherPort,
} from '@app/communities/domain/ports/subscriptions-publisher.port';
import { NotificationServicePort } from '@app/communities/domain/services/notification.service';
import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import {
  ACTION_CREATED_TOPIC,
  CAUSE_CREATED_TOPIC,
  GRAPHQL_PUB_SUB,
  REQUEST_STATUS_CHANGED_TOPIC,
} from './community.subscription';

@Injectable()
export class GraphqlSubscriptionsPublisherAdapter extends SubscriptionsPublisherPort {
  constructor(
    @Inject(GRAPHQL_PUB_SUB) private readonly pubSub: PubSubEngine,
    private readonly webPushService: NotificationServicePort,
  ) {
    super();
  }

  async publishCauseCreated(cause: Cause): Promise<void> {
    await this.pubSub.publish(CAUSE_CREATED_TOPIC, { causeCreated: cause });
    await this.webPushService.sendNotification({
      eventType: 'CAUSE',
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      initialDate: cause.initialDate,
      durationDays: cause.durationDays,
      ods: cause.ods,
      communityId: cause.communityId,
      userIds: cause.userIds,
    });
  }

  async publishActionCreated(action: Action): Promise<void> {
    await this.pubSub.publish(ACTION_CREATED_TOPIC, { actionCreated: action });
    await this.webPushService.sendNotification({
      eventType: 'ACTION',
      id: action.id.value,
      name: action.name,
      description: action.description,
      causeId: action.causeId,
    });
  }

  async publishRequestStatusChanged(event: RequestStatusChanged): Promise<void> {
    await this.pubSub.publish(REQUEST_STATUS_CHANGED_TOPIC, { requestStatusChanged: event });
    await this.webPushService.sendNotification({
      ...event,
      eventType: 'REQUEST_STATUS_CHANGED',
    });
  }
}
