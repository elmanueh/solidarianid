import { Repository } from '@app/ddd/repository/repository';
import { Action } from '../model/entities/action';

export abstract class ActionsRepositoryPort extends Repository<Action> {}
