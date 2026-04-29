import { User } from '@app/communities/shared/domain/model/entities/user';
import { UserService } from '@app/communities/shared/domain/services/user.service';
import { Either, left } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventType, Topics, UserEvent, UserEventDto } from '@solidarianid/kafka';

@Controller()
export class UserConsumerAdapter {
  private readonly logger = new Logger(UserConsumerAdapter.name);

  constructor(private readonly userService: UserService) {}
  @EventPattern(Topics.USERS)
  async handleUserEvent(@Payload() payload: UserEvent): Promise<void> {
    try {
      const data: UserEventDto = payload.data;
      const eventType: EventType = payload.eventType;
      this.logger.debug(`Received event: ${eventType}, id: ${data.id}`);

      const result = await this.dispatch(eventType, data);

      if (result.isLeft()) {
        this.logger.error(`Error processing user event: ${result.value.message}`, UserConsumerAdapter.name);
      }
    } catch (error) {
      this.logger.error(`Unexpected error processing user event: ${error}`, UserConsumerAdapter.name);
      throw error;
    }
  }

  private async dispatch(
    eventType: EventType,
    data: UserEventDto,
  ): Promise<Either<ValidationError | RepositoryException, User>> {
    switch (eventType) {
      case EventType.USER_CREATED:
        this.logger.debug(`Dispatching USER_CREATED for user ${data.id}`, UserConsumerAdapter.name);
        return this.userService.createUser(data);
      case EventType.USER_UPDATED:
        this.logger.debug(`Dispatching USER_UPDATED for user ${data.id}`, UserConsumerAdapter.name);
        return this.userService.updateUser(data);
      default:
        this.logger.warn(`Unhandled event type: ${eventType}`, UserConsumerAdapter.name);
        return left(new ValidationError(`Unhandled event type: ${eventType}`));
    }
  }
}
