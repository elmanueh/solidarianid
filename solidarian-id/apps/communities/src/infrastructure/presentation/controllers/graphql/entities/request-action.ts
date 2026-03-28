import { ObjectType, Field } from '@nestjs/graphql';
import { EventRequest } from './request-action.event.input';
import { ObjectiveRequest } from './request-action.objective.input';

@ObjectType()
export class RequestAction extends Request {
  @Field(() => [ObjectiveRequest])
  objectives: ObjectiveRequest[];

  @Field(() => [EventRequest])
  events: EventRequest[];

  @Field()
  causeId: string;
}
