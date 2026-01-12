import { User } from '@app/users/domain/model/user';
import { Publisher } from '@solidarianid/kafka';

export abstract class UsersPublisherPort extends Publisher<User> {}
