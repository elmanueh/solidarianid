import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ActionObjectiveInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  quantity: number;

  @Field()
  unit: string;
}
