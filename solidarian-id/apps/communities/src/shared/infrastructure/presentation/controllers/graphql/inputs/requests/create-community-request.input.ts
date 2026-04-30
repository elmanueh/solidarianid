import { CommunityCauseRequestInput } from '@app/communities/communities/infrastructure/presentation/controllers/graphql/inputs/requests/community-cause-request.input';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

@InputType()
export class CreateCommunityRequestInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => [CommunityCauseRequestInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommunityCauseRequestInput)
  causeCreationRequests: CommunityCauseRequestInput[];
}
