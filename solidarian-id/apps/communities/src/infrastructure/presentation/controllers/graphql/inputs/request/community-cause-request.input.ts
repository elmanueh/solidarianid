import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsDate, IsEnum, IsInt, IsString, Min } from 'class-validator';

@InputType()
export class CommunityCauseRequestInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => [SustainableDevelopmentGoal])
  @IsArray()
  @IsEnum(SustainableDevelopmentGoal, { each: true })
  ods: SustainableDevelopmentGoal[];

  @Field(() => Date)
  @IsDate()
  initialDate: Date;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  durationDays: number;
}
