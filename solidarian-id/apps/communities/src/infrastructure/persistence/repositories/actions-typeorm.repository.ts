import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from '@app/communities/domain/model/entities/action';
import { ActionEntity } from '../entities/action.entity';
import { ActionsRepositoryPort } from '@app/communities/domain/ports/actions.repository.port';
import { ActionEntityMapper } from '../mappers/action-entity.mapper';
import { Either, left, right, sequence } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { In } from 'typeorm';

@Injectable()
export class ActionsRepositoryTypeOrmAdapter
  extends RepositoryTypeORM<Action, ActionEntity>
  implements ActionsRepositoryPort
{
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: TypeOrmRepository<ActionEntity>,
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
}
