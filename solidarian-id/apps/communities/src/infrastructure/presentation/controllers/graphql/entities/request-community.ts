import { Request } from './request';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommunityCauseRequest } from './request-community.cause.input';

@ObjectType()
export class RequestCommunity extends Request {
  @Field(() => [CommunityCauseRequest])
  causeRequests: CommunityCauseRequest[];
}
