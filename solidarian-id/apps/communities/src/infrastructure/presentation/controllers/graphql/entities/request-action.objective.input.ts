import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ObjectiveRequest {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  quantity: number;

  @Field()
  unit: string;
}
