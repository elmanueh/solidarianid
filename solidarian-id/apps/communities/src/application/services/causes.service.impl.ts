import { Injectable } from '@nestjs/common';
import { CausesService } from '../../domain/services/causes.service';
import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Cause } from '../../domain/model/entities/cause';
import { CausesRepositoryPort } from '../../domain/ports/causes.repository.port';

@Injectable()
export class CausesServiceImpl implements CausesService {
  constructor(private readonly causeRepository: CausesRepositoryPort) {}

  async getCauses(): Promise<Either<ValidationError, Cause[]>> {
    return await this.causeRepository.findAll();
  }

  async getCauseById(id: string): Promise<Either<ValidationError, Cause>> {
    return await this.causeRepository.findById(id, ['actions']);
  }
}
