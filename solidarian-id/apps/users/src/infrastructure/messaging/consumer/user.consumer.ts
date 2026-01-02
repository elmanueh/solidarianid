import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { EventType, Topics, UserEvent, UserEventDto } from '@solidarianid/kafka';

@Controller()
export class UserConsumerAdapter {
  @EventPattern(Topics.USERS)
  async handleUserEvent(@Payload() payload: UserEvent, @Ctx() context: KafkaContext): Promise<void> {
    const { offset } = context.getMessage();
    const topic = context.getTopic();
    const partition = context.getPartition();
    const key = context.getMessage().key?.toString();

    const data: UserEventDto = payload.data;
    const eventType: EventType = payload.eventType;
    console.log(`Received user event with key: ${key}, offset: ${offset}, topic: ${topic}, partition: ${partition}`);
    console.log('Event Type:', eventType);
    console.log('Event Data:', data);

    // Process the event (business logic goes here)
    try {
      await context.getConsumer().commitOffsets([{ topic, partition, offset: (parseInt(offset) + 1).toString() }]);
    } catch (error) {
      console.error(`Error processing notification for order creation: ${error}`, UserConsumerAdapter.name);
    }
  }
}
