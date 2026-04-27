import { DomainEventDispatcher } from '@app/communities/application/events/domain-event-dispatcher';
import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';

class TestEvent implements CommunitiesDomainEvent {
  readonly eventName = 'TEST_EVENT';
  readonly occurredOn = new Date();
}

describe('DomainEventDispatcher', () => {
  it('dispatches an event to every matching handler', async () => {
    const event = new TestEvent();
    const matchingHandler: DomainEventHandler<TestEvent> = {
      canHandle: (candidate): candidate is TestEvent => candidate instanceof TestEvent,
      handle: jest.fn().mockResolvedValue(undefined),
    };
    const ignoredHandler: DomainEventHandler = {
      canHandle: (candidate): candidate is CommunitiesDomainEvent => false,
      handle: jest.fn().mockResolvedValue(undefined),
    };
    const dispatcher = new DomainEventDispatcher([matchingHandler, ignoredHandler]);

    await dispatcher.publish(event);

    expect((matchingHandler.handle as jest.Mock).mock.calls).toEqual([[event]]);
    expect((ignoredHandler.handle as jest.Mock).mock.calls).toEqual([]);
  });
});
