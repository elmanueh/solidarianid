import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from '@app/communities/domain/model/entities/action';
import { ActionEntity } from '../entities/action.entity';
import { ActionsRepositoryPort } from '@app/communities/domain/ports/actions.repository.port';
import { ActionEntityMapper } from '../mappers/action-entity.mapper';

@Injectable()
export class ActionsRepositoryTypeORM
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
}
