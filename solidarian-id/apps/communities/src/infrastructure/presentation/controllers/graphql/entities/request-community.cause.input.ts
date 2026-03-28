import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommunityCauseRequest {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [SustainableDevelopmentGoal])
  ods: SustainableDevelopmentGoal[];

  @Field(() => Date)
  initialDate: Date;

  @Field()
  durationDays: number;
}
