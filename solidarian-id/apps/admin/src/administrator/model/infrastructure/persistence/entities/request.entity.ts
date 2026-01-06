import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RequestDocument = HydratedDocument<RequestEntity>;

@Schema({
  collection: 'requests',
  discriminatorKey: 'type',
  timestamps: true,
})
export class RequestEntity {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: RequestStatus, required: true })
  status: RequestStatus;

  @Prop()
  reason?: string;

  @Prop({ required: true })
  userId: string;

  type?: RequestType;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const RequestSchema = SchemaFactory.createForClass(RequestEntity);

RequestSchema.index({ type: 1 });
RequestSchema.index({ status: 1 });
RequestSchema.index({ userId: 1 });
