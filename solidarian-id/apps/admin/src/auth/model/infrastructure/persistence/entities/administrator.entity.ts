import { HydratedDocument } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type AdministratorDocument = HydratedDocument<AdministratorEntity>;

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
