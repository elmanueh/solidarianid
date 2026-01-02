import { Injectable } from '@nestjs/common';
import { ActionsService } from '../../domain/services/actions.service';
import { Action } from '../../domain/model/entities/action';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either } from '@app/ddd/either';
import { ActionsRepositoryPort } from '../../domain/ports/actions.repository.port';

@Injectable()
export class ActionsServiceImpl implements ActionsService {
  constructor(private readonly actionRepository: ActionsRepositoryPort) {}

  async getActions(): Promise<Either<ValidationError, Action[]>> {
    return await this.actionRepository.findAll();
  }

  async getActionById(id: string): Promise<Either<ValidationError, Action>> {
    return await this.actionRepository.findById(id, ['events', 'objectives']);
  }
}
