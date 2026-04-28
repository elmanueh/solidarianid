import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventsRepositoryPort } from '@app/communities/shared/domain/ports/events.repository.port';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class EventsRepositoryTypeOrmAdapter implements EventsRepositoryPort {
  constructor(
    @InjectRepository(EventUserEntity)
    private readonly eventUserRepository: TypeOrmRepository<EventUserEntity>,
  ) {}

  async findAllEventIdsByUserId(userId: string): Promise<Either<RepositoryException, string[]>> {
    try {
      const eventUsers = await this.eventUserRepository.find({
        where: { userId },
        select: {
          eventId: true,
        },
      });

      const eventIds = Array.from(new Set(eventUsers.map(eventUser => eventUser.eventId)));

      return right(eventIds);
    } catch (error) {
      return left(new RepositoryException(`Failed to find events by user id ${userId}.`, error));
    }
  }
}
