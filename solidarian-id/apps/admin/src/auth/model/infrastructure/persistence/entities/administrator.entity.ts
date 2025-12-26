import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdministratorDocument = HydratedDocument<AdministratorEntity>;

@Schema({ collection: 'administrators' })
export class AdministratorEntity {
  @Prop()
  _id: string;

  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;
}

export const AdministratorSchema =
  SchemaFactory.createForClass(AdministratorEntity);
