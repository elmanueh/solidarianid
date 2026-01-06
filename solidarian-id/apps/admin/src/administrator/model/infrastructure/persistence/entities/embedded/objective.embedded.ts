import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ObjectiveEmbedded {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unit: string;

  @Prop({ default: 0 })
  currentAmount: number;
}

export const ObjectiveEmbeddedSchema = SchemaFactory.createForClass(ObjectiveEmbedded);
