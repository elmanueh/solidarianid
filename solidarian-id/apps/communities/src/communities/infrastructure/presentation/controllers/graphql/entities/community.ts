import { Cause } from '@app/communities/causes/infrastructure/presentation/controllers/graphql/entities/cause';
import { User } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/entities/user';
import { Field, ID, ObjectType } from '@nestjs/graphql';

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
