import { User } from '@app/users/domain/model/user';
import { UsersPublisherPort } from '@app/users/domain/ports/users.publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPublisher, Topics } from '@solidarianid/kafka';
import { UserEventDto } from '../dto/user.event';
import { UserEventMapper } from '../mappers/user.event.mapper';

@Injectable()
export class UsersKafkaPublisherAdapter
  extends KafkaPublisher<User, UserEventDto>
  implements UsersPublisherPort
{
  constructor(
    @Inject('users_kafka') publisher: ClientKafka,
    private readonly userEventMapper: UserEventMapper,
  ) {
    super(publisher, userEventMapper, Topics.USERS);
  }
}
