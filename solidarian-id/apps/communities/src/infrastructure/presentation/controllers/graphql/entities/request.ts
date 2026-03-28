import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { User } from '@app/users/domain/model/user';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Request {
  @Field(() => ID)
  id: string;

  @Field(() => RequestType)
  type: RequestType;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => RequestStatus)
  status: RequestStatus;

  @Field({ nullable: true })
  reason?: string;

  @Field(() => User)
  user: User;
}
