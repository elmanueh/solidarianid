import { Action } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/entities/action';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

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
