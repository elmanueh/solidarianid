import { User } from '@app/users/domain/model/user';
import { UsersPublisherPort } from '@app/users/domain/ports/users.publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPublisher, Topics } from '@solidarianid/kafka';

@Injectable()
export class UsersKafkaPublisherAdapter
  extends KafkaPublisher<User>
  implements UsersPublisherPort
{
  constructor(@Inject('users_kafka') publisher: ClientKafka) {
    super(publisher, Topics.USERS);
  }
}
