import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Action } from './action';

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

  @Field(() => [Int])
  ods: number[];

  @Field(() => Date)
  initialDate: Date;

  @Field(() => [Action])
  actions: Action[];

  @Field(() => ID)
  communityId: string;

  @Field(() => [ID])
  userIds: string[];
}
