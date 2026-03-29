import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EventPlaceInput {
  @Field()
  direction: string;

  @Field()
  city: string;

  @Field()
  countryCode: string;
}

@InputType()
export class ActionEventInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Date)
  initialDate: Date;

  @Field(() => EventPlaceInput)
  place: EventPlaceInput;
}
