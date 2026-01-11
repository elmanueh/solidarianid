import { Publisher } from '@solidarianid/kafka';
import { Community } from '../model/aggregates/community';

export abstract class CommunitiesPublisherPort extends Publisher<Community> {}
