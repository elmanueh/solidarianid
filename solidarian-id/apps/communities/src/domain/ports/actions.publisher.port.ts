import { Publisher } from '@solidarianid/kafka';
import { Action } from '../model/entities/action';

export abstract class ActionsPublisherPort extends Publisher<Action> {}
