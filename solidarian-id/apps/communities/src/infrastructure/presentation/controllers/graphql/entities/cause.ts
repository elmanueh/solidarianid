import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Action } from './action';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

@ObjectType()
export class Cause {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  durationDays: number;

  @Field(() => [SustainableDevelopmentGoal])
  ods: SustainableDevelopmentGoal[];

  @Field(() => Date)
  initialDate: Date;

  @Field(() => [Action])
  actions: Action[];

  @Field(() => ID)
  communityId: string;

  @Field(() => [ID])
  userIds: string[];
}
