import { Repository } from '@app/ddd/repository/repository';
import { Cause } from '../model/entities/cause';

export abstract class CausesRepositoryPort extends Repository<Cause> {}
