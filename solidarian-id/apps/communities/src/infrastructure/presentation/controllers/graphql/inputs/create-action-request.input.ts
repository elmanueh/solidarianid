import { Field, InputType } from '@nestjs/graphql';
import { ActionEventInput } from './action-event.input';
import { ActionObjectiveInput } from './action-objective.input';

@InputType()
export class CreateActionRequestInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [ActionObjectiveInput])
  objectives: ActionObjectiveInput[];

  @Field(() => [ActionEventInput])
  events: ActionEventInput[];

  @Field()
  userId: string;

  @Field()
  causeId: string;
}
