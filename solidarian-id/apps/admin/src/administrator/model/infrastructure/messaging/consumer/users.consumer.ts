import { UsersConsumerService } from '@app/admin/administrator/model/domain/services/users-consumer.service';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventType, Topics, UserEvent } from '@solidarianid/kafka';

@Controller()
export class UserConsumerAdapter {
  constructor(private readonly usersConsumerService: UsersConsumerService) {}

  @EventPattern(Topics.USERS)
  async handleUserEvent(@Payload() payload: UserEvent): Promise<void> {
    const data = payload.data;
    const eventType = payload.eventType;

    try {
      switch (eventType) {
        case EventType.USER_CREATED: {
          const result = await this.usersConsumerService.saveNewUser(data);
          if (result.isLeft()) {
            console.error(`Failed to save user ${data.id}: ${result.value.message}`);
            return;
          }
          break;
        }
        case EventType.USER_UPDATED: {
          break;
        }
        case EventType.USER_DELETED: {
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error(`Error processing notification for order creation: ${error}`, UserConsumerAdapter.name);
    }
  }
}
