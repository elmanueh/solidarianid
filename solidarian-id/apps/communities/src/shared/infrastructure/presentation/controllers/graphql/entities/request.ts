import { RequestStatus } from '@app/communities/shared/domain/model/enums/request-status';
import { RequestType } from '@app/communities/shared/domain/model/enums/request-type';
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

  @Field(() => ID)
  userId: string;
}
