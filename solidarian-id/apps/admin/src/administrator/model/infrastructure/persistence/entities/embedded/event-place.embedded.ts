import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class EventPlaceEmbedded {
  @Prop({ required: true })
  direction: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  countryCode: string;
}

export const EventPlaceEmbeddedSchema = SchemaFactory.createForClass(EventPlaceEmbedded);
