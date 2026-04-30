import { ActionEventInput } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/inputs/action-event.input';
import { ActionObjectiveInput } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/inputs/action-objective.input';
import { Field, InputType } from '@nestjs/graphql';
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
  causeId: string;
}
