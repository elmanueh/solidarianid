import { Publisher } from '@solidarianid/kafka';
import { Cause } from '../model/aggregates/cause';

export abstract class CausesPublisherPort extends Publisher<Cause> {}
