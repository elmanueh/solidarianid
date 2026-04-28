import { Repository } from '@app/ddd/repository/repository';
import { User } from '../model/entities/user';

export abstract class UsersRepositoryPort extends Repository<User> {}
