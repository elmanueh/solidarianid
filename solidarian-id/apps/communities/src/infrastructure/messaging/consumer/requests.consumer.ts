import { RequestsService } from '@app/communities/domain/services/request.service';
import { Either, left } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventType, RequestEvent, RequestEventDto, Topics } from '@solidarianid/kafka';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

@Controller()
export class RequestsConsumerAdapter {
  private readonly logger = new Logger(RequestsConsumerAdapter.name);

  constructor(private readonly requestService: RequestsService) {}

  @EventPattern(Topics.REQUESTS)
  async handleRequestEvent(@Payload() payload: RequestEvent) {
    try {
      const { eventType, data } = payload;
      this.logger.debug(`Received event: ${eventType}, type: ${data.type}, id: ${data.id}`);

      const result = await this.dispatch(eventType, data);

      if (result.isLeft()) {
        this.logger.error(`Error processing request event: ${result.value.message}`, RequestsConsumerAdapter.name);
      }
    } catch (error) {
      this.logger.error(`Unexpected error processing request event: ${error}`, RequestsConsumerAdapter.name);
      throw error;
    }
  }

  private async dispatch(
    eventType: EventType,
    data: RequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, void>> {
    switch (eventType) {
      case EventType.REQUEST_ACCEPTED:
        this.logger.debug(`Dispatching REQUEST_ACCEPTED for request ${data.id}`, RequestsConsumerAdapter.name);
        return await this.requestService.acceptRequest(data);
      case EventType.REQUEST_DECLINED:
        this.logger.debug(`Dispatching REQUEST_DECLINED for request ${data.id}`, RequestsConsumerAdapter.name);
        return await this.requestService.rejectRequest(data);
      default:
        this.logger.warn(`Unhandled event type: ${eventType}`, RequestsConsumerAdapter.name);
        return left(new ValidationError(`Unhandled event type: ${eventType}`));
    }
  }
}
