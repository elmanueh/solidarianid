import { User } from '@app/communities/domain/model/entities/user';
import { UserService } from '@app/communities/domain/services/user.service';
import { Either, left } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventType, Topics, UserEvent, UserEventDto } from '@solidarianid/kafka';

@Controller()
export class UserConsumerAdapter {
  constructor(private readonly userService: UserService) {}
  @EventPattern(Topics.USERS)
  async handleUserEvent(@Payload() payload: UserEvent): Promise<void> {
    const data: UserEventDto = payload.data;
    const eventType: EventType = payload.eventType;

    await this.dispatch(eventType, data);
  }

  private async dispatch(
    eventType: EventType,
    data: UserEventDto,
  ): Promise<Either<ValidationError | RepositoryException, User>> {
    switch (eventType) {
      case EventType.USER_CREATED:
        return this.userService.createUser(data);
      case EventType.USER_UPDATED:
        return this.userService.updateUser(data);
      default:
        return Promise.resolve(left(new ValidationError(`Unhandled event type: ${eventType}`)));
    }
  }
}
