import { Field, InputType } from '@nestjs/graphql';
import { ActionEventInput } from './action-event.input';
import { ActionObjectiveInput } from './action-objective.input';
import { Type } from 'class-transformer';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';

@InputType()
export class CreateActionRequestInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => [ActionObjectiveInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionObjectiveInput)
  objectives: ActionObjectiveInput[];

  @Field(() => [ActionEventInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionEventInput)
  events: ActionEventInput[];

  @Field()
  @IsUUID()
  userId: string;

  @Field()
  @IsUUID()
  causeId: string;
}
