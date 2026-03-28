import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Request } from './request';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CauseRequest extends Request {
  @Field(() => [SustainableDevelopmentGoal])
  ods: SustainableDevelopmentGoal[];

  @Field(() => Date)
  initialDate: Date;

  @Field()
  durationDays: number;

  @Field()
  communityId: string;
}
