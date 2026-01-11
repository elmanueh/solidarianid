import { Either, left } from '@app/ddd/either';
import { UsersService } from '../../../domain/services/users.service';
import { Controller, Logger } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { EventPattern } from '@nestjs/microservices/decorators/event-pattern.decorator';
import {
  CommunityCreatedEventDto,
  CommunityEvent,
  CommunityEventDto,
  CommunityMemberJoinedEventDto,
  EventType,
  Topics,
} from '@solidarianid/kafka';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { CommunityError } from '../../../domain/errors/community-error';
import { Role } from '../../../domain/enums/role';

@Controller()
export class CommunityConsumerAdapter {
  private readonly logger = new Logger(CommunityConsumerAdapter.name);
  constructor(private readonly usersService: UsersService) {}

  @EventPattern(Topics.COMMUNITIES)
  async handleCommunityEvent(@Payload() payload: CommunityEvent): Promise<void> {
    try {
      const { data, eventType } = payload;
      this.logger.debug(`Received event: ${eventType}`, CommunityConsumerAdapter.name);
      const result = await this.dispatch(eventType, data);
      if (result.isLeft()) {
        this.logger.error(
          `Error processing notification for order creation: ${result.value.message}`,
          CommunityConsumerAdapter.name,
        );
      }
    } catch (error) {
      this.logger.error(`Unexpected error processing community event: ${error}`, CommunityConsumerAdapter.name);
      throw error;
    }
  }

  private async dispatch(eventType: EventType, data: CommunityEventDto): Promise<Either<RepositoryException, void>> {
    switch (eventType) {
      case EventType.COMMUNITY_CREATED: {
        const createdData = data as CommunityCreatedEventDto;
        this.logger.debug(
          `Dispatching COMMUNITY_CREATED for community ${createdData.id}`,
          CommunityConsumerAdapter.name,
        );
        return await this.usersService.addMemberShip(createdData.creatorId, {
          communityId: createdData.id,
          communityName: createdData.name,
          role: Role.CREATOR,
        });
      }
      case EventType.COMMUNITY_MEMBER_JOINED: {
        const memberJoinedData = data as CommunityMemberJoinedEventDto;
        this.logger.debug(
          `Dispatching COMMUNITY_MEMBER_JOINED for community ${memberJoinedData.communityId}`,
          CommunityConsumerAdapter.name,
        );
        return await this.usersService.addMemberShip(memberJoinedData.userId, {
          communityId: memberJoinedData.communityId,
          communityName: memberJoinedData.communityName,
          role: Role.MEMBER,
        });
      }
      default: {
        this.logger.warn(`Unhandled event type: ${eventType}`, CommunityConsumerAdapter.name);
        return left(new CommunityError(`Unhandled event type: ${eventType}`));
      }
    }
  }
}
