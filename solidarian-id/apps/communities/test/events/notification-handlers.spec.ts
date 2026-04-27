/* eslint-disable @typescript-eslint/unbound-method */
import { ActionsHandlerDispatcher } from '@app/communities/application/events/actions-handler-dispatcher';
import { CausesHandlerDispatcher } from '@app/communities/application/events/causes-handler-dispatcher';
import { CommunitiesHandlerDispatcher } from '@app/communities/application/events/communities-handler-dispatcher';
import { RequestsHandlerDispatcher } from '@app/communities/application/events/requests-handler-dispatcher';
import { ActionCreatedEvent } from '@app/communities/domain/events/action-created.event';
import { CauseCreatedEvent } from '@app/communities/domain/events/cause-created.event';
import { CommunityCreatedEvent } from '@app/communities/domain/events/community-created.event';
import { CommunityMemberJoinedEvent } from '@app/communities/domain/events/community-member-joined.event';
import { RequestCreatedEvent } from '@app/communities/domain/events/request-created.event';
import { RequestStatusChangedEvent } from '@app/communities/domain/events/request-status-changed.event';
import { Action } from '@app/communities/domain/model/aggregates/action';
import { Cause } from '@app/communities/domain/model/aggregates/cause';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { User } from '@app/communities/domain/model/entities/user';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { ActionsPublisherPort } from '@app/communities/domain/ports/actions.publisher.port';
import { CausesPublisherPort } from '@app/communities/domain/ports/causes.publisher.port';
import { CommunitiesPublisherPort } from '@app/communities/domain/ports/communities.publisher.port';
import { RealtimeNotificationsPublisherPort } from '@app/communities/domain/ports/realtime-notifications.publisher.port';
import { RequestPublisherPort } from '@app/communities/domain/ports/requests.publisher.port';
import { SubscriptionType, WebPushSenderPort } from '@app/communities/domain/ports/web-push-sender.port';
import { DomainEvents } from '@app/ddd/domain-events';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { EventType } from '@solidarianid/kafka';

describe('Notification event dispatchers', () => {
  const createValidAction = (): Action => {
    const actionOrError = Action.create({
      name: 'Nueva accion solidaria',
      description: 'Descripcion valida de una accion solidaria para pruebas',
      objectives: [],
      events: [],
      causeId: '550e8400-e29b-41d4-a716-446655440001',
    });

    if (actionOrError.isLeft()) {
      throw actionOrError.value;
    }

    return actionOrError.value;
  };

  const createValidCause = (): Cause => {
    const causeOrError = Cause.create({
      name: 'Nueva causa solidaria',
      description: 'Descripcion valida de una causa solidaria para pruebas',
      initialDate: new Date('2026-01-01T00:00:00.000Z'),
      durationDays: 30,
      ods: [SustainableDevelopmentGoal.NoPoverty],
      actions: [],
      communityId: '550e8400-e29b-41d4-a716-446655440001',
      userIds: ['550e8400-e29b-41d4-a716-446655440000'],
    });

    if (causeOrError.isLeft()) {
      throw causeOrError.value;
    }

    return causeOrError.value;
  };

  const createValidCommunity = (): Community => {
    const creatorOrError = User.create({ fullName: 'Test User' }, '550e8400-e29b-41d4-a716-446655440000');

    if (creatorOrError.isLeft()) {
      throw creatorOrError.value;
    }

    const communityOrError = Community.create(
      {
        name: 'Comunidad de prueba',
        description: 'Descripcion valida de una comunidad solidaria para pruebas',
        creator: creatorOrError.value,
        admins: [],
        members: [creatorOrError.value],
        causes: [],
      },
      '550e8400-e29b-41d4-a716-446655440001',
    );

    if (communityOrError.isLeft()) {
      throw communityOrError.value;
    }

    return communityOrError.value;
  };

  const createDispatcherContext = () => ({
    domainEvents: {
      register: jest.fn(),
      registerGlobal: jest.fn(),
      dispatch: jest.fn(),
    } as unknown as DomainEvents,
    actionsPublisher: {
      publish: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<ActionsPublisherPort>,
    causesPublisher: { publish: jest.fn().mockResolvedValue(undefined) } as unknown as jest.Mocked<CausesPublisherPort>,
    communitiesPublisher: {
      publish: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<CommunitiesPublisherPort>,
    requestPublisher: {
      publish: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<RequestPublisherPort>,
    webPushSender: { send: jest.fn().mockResolvedValue(undefined) } as unknown as jest.Mocked<WebPushSenderPort>,
    realtimePublisher: {
      publishCauseCreated: jest.fn().mockResolvedValue(undefined),
      publishActionCreated: jest.fn().mockResolvedValue(undefined),
      publishRequestStatusChanged: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<RealtimeNotificationsPublisherPort>,
  });

  it('dispatches action created events with the current dispatcher', () => {
    const action = createValidAction();
    const event = new ActionCreatedEvent(action);
    const context = createDispatcherContext();

    const handler = new ActionsHandlerDispatcher(
      context.domainEvents,
      context.actionsPublisher,
      context.webPushSender,
      context.realtimePublisher,
    );

    handler.handleEvent(event);

    expect(context.actionsPublisher.publish).toHaveBeenCalledWith(EventType.ACTION_CREATED, action);
    expect(context.webPushSender.send).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: SubscriptionType.ACTION,
        id: action.id.value,
        name: action.name,
        description: action.description,
        causeId: action.causeId,
      }),
    );
    expect(context.realtimePublisher.publishActionCreated).toHaveBeenCalledWith(event);
  });

  it('dispatches cause created events with the current dispatcher', () => {
    const cause = createValidCause();
    const event = new CauseCreatedEvent(cause);
    const context = createDispatcherContext();

    const handler = new CausesHandlerDispatcher(
      context.domainEvents,
      context.causesPublisher,
      context.webPushSender,
      context.realtimePublisher,
    );

    handler.handleEvent(event);

    expect(context.causesPublisher.publish).toHaveBeenCalledWith(EventType.CAUSE_CREATED, cause);
    expect(context.webPushSender.send).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: SubscriptionType.CAUSE,
        id: cause.id.value,
        name: cause.name,
        description: cause.description,
        initialDate: cause.initialDate,
        durationDays: cause.durationDays,
        ods: cause.ods,
        communityId: cause.communityId,
        userIds: cause.userIds,
      }),
    );
    expect(context.realtimePublisher.publishCauseCreated).toHaveBeenCalledWith(event);
  });

  it('dispatches community events with the current dispatcher', () => {
    const community = createValidCommunity();
    const context = createDispatcherContext();
    const handler = new CommunitiesHandlerDispatcher(context.domainEvents, context.communitiesPublisher);

    handler.handleEvent(new CommunityCreatedEvent(community));
    handler.handleEvent(new CommunityMemberJoinedEvent(community));

    expect(context.communitiesPublisher.publish).toHaveBeenNthCalledWith(1, EventType.COMMUNITY_CREATED, community);
    expect(context.communitiesPublisher.publish).toHaveBeenNthCalledWith(
      2,
      EventType.COMMUNITY_MEMBER_JOINED,
      community,
    );
  });

  it('dispatches request events with the current dispatcher', () => {
    const context = createDispatcherContext();
    const request = { id: { value: '550e8400-e29b-41d4-a716-446655440002' } } as RequestCreatedEvent['request'];
    const createdEvent = new RequestCreatedEvent(request);
    const statusChangedEvent = new RequestStatusChangedEvent({
      id: '550e8400-e29b-41d4-a716-446655440003',
      userId: '550e8400-e29b-41d4-a716-446655440000',
      type: RequestType.CAUSE,
      name: 'Solicitud de causa',
      description: 'Descripcion valida de una solicitud',
      status: RequestStatus.APPROVED,
    });

    const handler = new RequestsHandlerDispatcher(
      context.domainEvents,
      context.requestPublisher,
      context.webPushSender,
      context.realtimePublisher,
    );

    handler.handleEvent(createdEvent);
    handler.handleEvent(statusChangedEvent);

    expect(context.requestPublisher.publish).toHaveBeenCalledWith(EventType.REQUEST_CREATED, request);
    expect(context.webPushSender.send).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: SubscriptionType.REQUEST_STATUS_CHANGED,
        id: statusChangedEvent.id,
        userId: statusChangedEvent.userId,
        type: statusChangedEvent.requestType,
        name: statusChangedEvent.name,
        description: statusChangedEvent.description,
        status: statusChangedEvent.status,
        reason: statusChangedEvent.reason,
        createdEntityId: statusChangedEvent.createdEntityId,
      }),
    );
    expect(context.realtimePublisher.publishRequestStatusChanged).toHaveBeenCalledWith(statusChangedEvent);
  });
});
