import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Cause } from './cause';
import { User } from './user';

@ObjectType()
export class Community {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => User)
  creator: User;

  @Field(() => [User])
  admins: User[];

  @Field(() => [User])
  members: User[];

  @Field(() => [Cause])
  causes: Cause[];
}
