import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Request } from './request';

@ObjectType()
export class RequestStatusChangedEvent extends Request {
  @Field(() => ID, { nullable: true })
  createdEntityId?: string;
}
