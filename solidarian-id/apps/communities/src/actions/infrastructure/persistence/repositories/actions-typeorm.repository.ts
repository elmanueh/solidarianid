import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { ActionEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/action-entity.mapper';
import { Action } from '@app/communities/shared/domain/model/aggregates/action';
import { ActionsRepositoryPort } from '@app/communities/shared/domain/ports/actions.repository.port';
import { Either, left, right, sequence } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class ActionsRepositoryTypeOrmAdapter
  extends RepositoryTypeORM<Action, ActionEntity>
  implements ActionsRepositoryPort
{
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: TypeOrmRepository<ActionEntity>,
    @InjectRepository(EventUserEntity)
    private readonly eventUserRepository: TypeOrmRepository<EventUserEntity>,
    private readonly actionMapper: ActionEntityMapper,
  ) {
    super(actionRepository, actionMapper);
  }

  async findAllByCauseIds(causeIds: string[]): Promise<Either<ValidationError | RepositoryException, Action[]>> {
    if (causeIds.length === 0) {
      return right([]);
    }

    try {
      const entities = await this.actionRepository.find({
        where: { causeId: In(causeIds) },
        relations: ['events', 'objectives'],
      });

      const actionsOrError = sequence(entities.map(entity => this.actionMapper.fromPersistence(entity)));

      if (actionsOrError.isLeft()) {
        return left(actionsOrError.value);
      }

      return right(actionsOrError.value);
    } catch (error) {
      return left(new RepositoryException('Failed to find actions by cause ids.', error));
    }
  }

  async findByEventId(eventId: string): Promise<Either<ValidationError | RepositoryException, Action>> {
    try {
      const entity = await this.actionRepository
        .createQueryBuilder('action')
        .innerJoin('action.events', 'eventFilter', 'eventFilter.id = :eventId', { eventId })
        .leftJoinAndSelect('action.events', 'event')
        .leftJoinAndSelect('event.assistants', 'assistant')
        .getOne();

      if (!entity) {
        return left(new EntityNotFoundException(Action.name, eventId));
      }

      const actionOrError = this.actionMapper.fromPersistence(entity);
      if (actionOrError.isLeft()) {
        return left(actionOrError.value);
      }

      return right(actionOrError.value);
    } catch (error) {
      return left(new RepositoryException(`Failed to find action by event id ${eventId}.`, error));
    }
  }

  async removeAssistant(eventId: string, userId: string): Promise<Either<RepositoryException, void>> {
    try {
      await this.eventUserRepository.delete({ eventId, userId });
      return right(undefined);
    } catch (error) {
      return left(new RepositoryException('Failed to remove assistant from event.', error));
    }
  }
}
