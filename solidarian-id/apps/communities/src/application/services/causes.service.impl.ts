import { Injectable } from '@nestjs/common';
import { CausesService } from '../../domain/services/causes.service';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Cause } from '../../domain/model/entities/cause';
import { CausesRepositoryPort } from '../../domain/ports/causes.repository.port';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { CauseRequestEventDto } from '@solidarianid/kafka';

@Injectable()
export class CausesServiceImpl implements CausesService {
  constructor(private readonly causeRepository: CausesRepositoryPort) {}

  async create(causeEventDto: CauseRequestEventDto): Promise<Either<ValidationError | RepositoryException, Cause>> {
    const causeOrError = Cause.create(
      {
        name: causeEventDto.name,
        description: causeEventDto.description,
        initialDate: new Date(causeEventDto.initialDate),
        durationDays: causeEventDto.durationDays,
        ods: causeEventDto.ods,
        actions: [],
        communityId: causeEventDto.communityId,
      },
      causeEventDto.id,
    );

    if (causeOrError.isLeft()) {
      return left(causeOrError.value);
    }

    const saveResult = await this.causeRepository.save(causeOrError.value);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    return right(causeOrError.value);
  }

  async getCauses(): Promise<Either<ValidationError, Cause[]>> {
    return await this.causeRepository.findAll();
  }

  async getCauseById(id: string): Promise<Either<ValidationError, Cause>> {
    return await this.causeRepository.findById(id, ['actions']);
  }
}
