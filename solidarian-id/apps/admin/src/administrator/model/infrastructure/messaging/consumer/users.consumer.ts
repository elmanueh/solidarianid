import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventType, Topics, UserEvent, UserEventDto } from '@solidarianid/kafka';
import { UsersService } from '../../../domain/services/users.service';
import { Either, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

@Controller()
export class UserConsumerAdapter {
  private readonly logger = new Logger(UserConsumerAdapter.name);

  constructor(private readonly usersConsumerService: UsersService) {}

  @EventPattern(Topics.USERS)
  async handleUserEvent(@Payload() payload: UserEvent): Promise<void> {
    try {
      const { data, eventType } = payload;
      this.logger.debug(`Received event: ${eventType}, id: ${data.id}`, UserConsumerAdapter.name);
      const result = await this.dispatch(eventType, data);
      if (result.isLeft()) {
        this.logger.error(
          `Error processing notification for order creation: ${result.value.message}`,
          UserConsumerAdapter.name,
        );
      }
    } catch (error) {
      this.logger.error(`Unexpected error processing user event: ${error}`, UserConsumerAdapter.name);
      throw error;
    }
  }

  private async dispatch(eventType: EventType, data: UserEventDto): Promise<Either<RepositoryException, void>> {
    switch (eventType) {
      case EventType.USER_CREATED:
        this.logger.debug(`Dispatching USER_CREATED for user ${data.id}`, UserConsumerAdapter.name);
        return this.usersConsumerService.createUser(data);
      case EventType.USER_UPDATED:
        this.logger.debug(`Dispatching USER_UPDATED for user ${data.id}`, UserConsumerAdapter.name);
        return this.usersConsumerService.updateUser(data);
      case EventType.USER_DELETED:
        this.logger.debug(`Dispatching USER_DELETED for user ${data.id}`, UserConsumerAdapter.name);
        return right(undefined);
      default:
        this.logger.warn(`Unhandled event type: ${eventType}`, UserConsumerAdapter.name);
        return right(undefined);
    }
  }
}
