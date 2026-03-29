import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';

@InputType()
export class EventPlaceInput {
  @Field()
  @IsString()
  direction: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  countryCode: string;
}

@InputType()
export class ActionEventInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => Date)
  @IsDate()
  initialDate: Date;

  @Field(() => EventPlaceInput)
  @ValidateNested()
  @Type(() => EventPlaceInput)
  place: EventPlaceInput;
}
