import { Publisher } from '@solidarianid/kafka';
import { User } from '../model/user';

export abstract class UsersPublisherPort extends Publisher<User> {}
