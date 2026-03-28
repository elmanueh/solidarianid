import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Place {
  @Field()
  direction: string;

  @Field()
  city: string;

  @Field()
  countryCode: string;
}

@ObjectType()
export class EventRequest {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Date)
  initialDate: Date;

  @Field(() => Place)
  place: Place;
}
