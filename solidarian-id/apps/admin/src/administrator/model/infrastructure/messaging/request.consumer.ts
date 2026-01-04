import { RequestError } from '@app/admin/administrator/model/domain/errors/request-error';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { Either, left } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventType, RequestEvent, RequestEventDto, Topics } from '@solidarianid/kafka';

@Controller()
export class RequestConsumerAdapter {
  private readonly logger = new Logger(RequestConsumerAdapter.name);

  constructor(private readonly requestService: RequestsService) {}

  @EventPattern(Topics.REQUESTS)
  async handleRequestEvent(@Payload() payload: RequestEvent): Promise<void> {
    try {
      const { data, eventType } = payload;
      this.logger.debug(`Received event: ${eventType}, type: ${data.type}, id: ${data.id}`);
      const result = await this.dispatch(eventType, data);

      if (result.isLeft()) {
        this.logger.error(`Error processing request event: ${result.value.message}`);
      }
    } catch (error) {
      this.logger.error(`Unexpected error processing request event: ${error}`);
      throw error;
    }
  }

  private async dispatch(
    eventType: EventType,
    data: RequestEventDto,
  ): Promise<Either<RequestError | RepositoryException, any>> {
    if (eventType === EventType.REQUEST_CREATED) {
      this.logger.debug(`Dispatching REQUEST_CREATED for request ${data.id}`);
      return this.requestService.createRequest(data);
    }

    this.logger.warn(`Unhandled event type: ${eventType}`);
    return left(new RequestError(`Unhandled event type: ${eventType}`));
  }
}
