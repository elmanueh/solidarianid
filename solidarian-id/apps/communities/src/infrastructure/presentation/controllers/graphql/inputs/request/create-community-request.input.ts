import { Field, InputType } from '@nestjs/graphql';
import { CommunityCauseRequestInput } from './community-cause-request.input';

@InputType()
export class CreateCommunityRequestInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [CommunityCauseRequestInput])
  causeCreationRequests: CommunityCauseRequestInput[];

  @Field()
  userId: string;
}
