import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CommunityCauseRequestInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [SustainableDevelopmentGoal])
  ods: SustainableDevelopmentGoal[];

  @Field(() => Date)
  initialDate: Date;

  @Field(() => Int)
  durationDays: number;
}
