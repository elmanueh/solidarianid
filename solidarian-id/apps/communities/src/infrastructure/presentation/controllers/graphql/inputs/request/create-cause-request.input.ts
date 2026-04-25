import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsDate, IsInt, IsString, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreateCauseRequestInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => [Int])
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(17, { each: true })
  ods: number[];

  @Field(() => Date)
  @IsDate()
  initialDate: Date;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  durationDays: number;

  @Field()
  @IsUUID()
  communityId: string;
}
