import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EventPlaceEmbedded,
  EventPlaceEmbeddedSchema,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/embedded/event-place.embedded';

@Schema({ _id: false })
export class EventEmbedded {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Date })
  initialDate: Date;

  @Prop({ required: true, type: EventPlaceEmbeddedSchema })
  place: EventPlaceEmbedded;
}

export const EventEmbeddedSchema = SchemaFactory.createForClass(EventEmbedded);
