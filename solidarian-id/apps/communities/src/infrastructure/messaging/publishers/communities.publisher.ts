import { Community } from '@app/communities/domain/model/aggregates/community';
import { CommunitiesPublisherPort } from '@app/communities/domain/ports/communities.publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CommunityEventDto, KafkaPublisher, Topics } from '@solidarianid/kafka';
import { CommunityEventMapper } from '../mappers/community-event.mapper';

@Injectable()
export class CommunitiesKafkaPublisherAdapter
  extends KafkaPublisher<Community, CommunityEventDto>
  implements CommunitiesPublisherPort
{
  constructor(
    @Inject(`communities_kafka`)
    private readonly kafkaClient: ClientKafka,
    private readonly communityEventMapper: CommunityEventMapper,
  ) {
    super(kafkaClient, communityEventMapper, Topics.COMMUNITIES);
  }
}
