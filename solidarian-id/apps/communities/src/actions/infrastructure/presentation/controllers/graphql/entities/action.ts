import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Action {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Objective])
  objectives: Objective[];

  @Field(() => [Event])
  events: Event[];

  @Field(() => ID)
  causeId: string;

  @Field(() => ID)
  communityId: string;
}

@ObjectType()
export class EventPlace {
  @Field()
  direction: string;

  @Field()
  city: string;

  @Field()
  countryCode: string;
}

@ObjectType()
export class Event {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Date)
  initialDate: Date;

  @Field(() => EventPlace)
  place: EventPlace;

  @Field(() => [ID])
  assistantIds: string[];
}

@ObjectType()
export class Objective {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  unit: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  currentAmount: number;
}
