import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { Topics } from '@solidarianid/kafka';

@Controller()
export class UserConsumerAdapter {
  @MessagePattern(Topics.USERS)
  async handleUserCreated(
    @Payload() payload: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const { offset } = context.getMessage();
    const topic = context.getTopic();
    const partition = context.getPartition();
    const key = context.getMessage().key?.toString();
    console.log(
      `Received message from topic [${topic}] partition [${partition}] offset [${offset}] key [${key}]`,
      UserConsumerAdapter.name,
    );

    console.log(
      `Payload: ${JSON.stringify(payload)}`,
      UserConsumerAdapter.name,
    );

    try {
      await context
        .getConsumer()
        .commitOffsets([
          { topic, partition, offset: (parseInt(offset) + 1).toString() },
        ]);
    } catch (error) {
      console.error(
        `Error processing notification for order creation: ${error}`,
        UserConsumerAdapter.name,
      );
    }
  }
}
