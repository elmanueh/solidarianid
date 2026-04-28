import { Publisher } from '@solidarianid/kafka';
import { Action } from '../model/aggregates/action';

export abstract class ActionsPublisherPort extends Publisher<Action> {}
