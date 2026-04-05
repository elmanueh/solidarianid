import { Field, InputType } from '@nestjs/graphql';
import { CommunityCauseRequestInput } from './community-cause-request.input';
import { Type } from 'class-transformer';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';

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

  @Field()
  @IsUUID()
  userId: string;
}
