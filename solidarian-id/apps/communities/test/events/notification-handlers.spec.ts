import { PublishRequestStatusChangedToGraphqlHandler } from '@app/communities/application/events/handlers/graphql/publish-request-status-changed-to-graphql.handler';
import { PublishActionCreatedToKafkaHandler } from '@app/communities/application/events/handlers/kafka/publish-action-created-to-kafka.handler';
import { SendCauseCreatedWebPushHandler } from '@app/communities/application/events/handlers/webpush/send-cause-created-webpush.handler';
import { ActionCreatedEvent } from '@app/communities/domain/events/action-created.event';
import { CauseCreatedEvent } from '@app/communities/domain/events/cause-created.event';
import { RequestStatusChangedEvent } from '@app/communities/domain/events/request-status-changed.event';
import { Action } from '@app/communities/domain/model/entities/action';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { RealtimeNotificationsPublisherPort } from '@app/communities/domain/ports/realtime-notifications.publisher.port';
import { WebPushSenderPort } from '@app/communities/domain/ports/web-push-sender.port';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { EventType } from '@solidarianid/kafka';

describe('Notification event handlers', () => {
  it('publishes action-created domain events to Kafka', async () => {
    const action = Action.create({
      name: 'Nueva accion',
      description: 'Descripcion valida de una accion solidaria',
      objectives: [],
      events: [],
      causeId: '550e8400-e29b-41d4-a716-446655440001',
    });

    if (action.isLeft()) {
      throw action.value;
    }

    const actionsPublisher = { publish: jest.fn().mockResolvedValue(undefined) };
    const handler = new PublishActionCreatedToKafkaHandler(actionsPublisher);

    await handler.handle(new ActionCreatedEvent(action.value));

    expect(actionsPublisher.publish.mock.calls).toEqual([[EventType.ACTION_CREATED, action.value]]);
  });

  it('maps cause-created domain events to WebPush notifications', async () => {
    const cause = Cause.create({
      name: 'Nueva causa',
      description: 'Descripcion valida de una causa solidaria',
      initialDate: new Date('2026-01-01T00:00:00.000Z'),
      durationDays: 30,
      ods: [SustainableDevelopmentGoal.NoPoverty],
      actions: [],
      communityId: '550e8400-e29b-41d4-a716-446655440001',
      userIds: ['550e8400-e29b-41d4-a716-446655440000'],
    });

    if (cause.isLeft()) {
      throw cause.value;
    }

    const webPushSender: jest.Mocked<WebPushSenderPort> = { send: jest.fn().mockResolvedValue(undefined) };
    const handler = new SendCauseCreatedWebPushHandler(webPushSender);

    await handler.handle(new CauseCreatedEvent(cause.value));

    expect(webPushSender.send.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({
        eventType: 'CAUSE',
        id: cause.value.id.value,
        communityId: cause.value.communityId,
      }),
    );
  });

  it('publishes request-status-changed domain events to GraphQL realtime', async () => {
    const event = new RequestStatusChangedEvent({
      id: '550e8400-e29b-41d4-a716-446655440001',
      userId: '550e8400-e29b-41d4-a716-446655440000',
      type: RequestType.CAUSE,
      name: 'Solicitud de causa',
      description: 'Descripcion valida de una solicitud',
      status: RequestStatus.APPROVED,
    });
    const realtimePublisher: jest.Mocked<RealtimeNotificationsPublisherPort> = {
      publishCauseCreated: jest.fn().mockResolvedValue(undefined),
      publishActionCreated: jest.fn().mockResolvedValue(undefined),
      publishRequestStatusChanged: jest.fn().mockResolvedValue(undefined),
    };
    const handler = new PublishRequestStatusChangedToGraphqlHandler(realtimePublisher);

    await handler.handle(event);

    expect(realtimePublisher.publishRequestStatusChanged.mock.calls).toEqual([[event]]);
  });
});
