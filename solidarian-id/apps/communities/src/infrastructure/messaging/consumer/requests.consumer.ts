import { RequestsService } from '@app/communities/domain/services/request.service';
import { Either, left } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventType, RequestEvent, RequestEventDto, Topics } from '@solidarianid/kafka';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

@Controller()
export class RequestsConsumerAdapter {
  constructor(private readonly requestService: RequestsService) {}

  @EventPattern(Topics.REQUESTS)
  async handleRequestEvent(@Payload() payload: RequestEvent) {
    const { eventType, data } = payload;

    await this.dispatch(eventType, data);
  }

  private async dispatch(
    eventType: EventType,
    data: RequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, void>> {
    switch (eventType) {
      case EventType.REQUEST_ACCEPTED:
        return await this.requestService.acceptRequest(data);
        break;
      case EventType.REQUEST_DECLINED:
        return await this.requestService.rejectRequest(data);
        break;
      default:
        return left(new ValidationError(`Unhandled event type: ${eventType}`));
    }
  }
}
