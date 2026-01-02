import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { CauseEntity } from '../entities/cause.entity';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CauseEntityMapper } from '../mappers/cause-entity.mapper';

@Injectable()
export class CausesRepositoryTypeOrmAdapter
  extends RepositoryTypeORM<Cause, CauseEntity>
  implements CausesRepositoryPort
{
  constructor(
    @InjectRepository(CauseEntity)
    private readonly causeRepository: TypeOrmRepository<CauseEntity>,
    private readonly causeMapper: CauseEntityMapper,
  ) {
    super(causeRepository, causeMapper);
  }
}
