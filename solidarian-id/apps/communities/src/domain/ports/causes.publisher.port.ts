import { Publisher } from '@solidarianid/kafka';
import { Cause } from '../model/entities/cause';

export abstract class CausesPublisherPort extends Publisher<Cause> {}
