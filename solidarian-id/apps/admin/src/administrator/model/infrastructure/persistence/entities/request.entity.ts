import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { CauseRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/cause-request.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// aqui añadis los otros tipos de request "<CauseRequestEntity | AnotherRequestEntity | ...>"
export type RequestDocument = HydratedDocument<CauseRequestEntity>;

@Schema({
  collection: 'requests',
  discriminatorKey: 'type',
  timestamps: true,
  _id: false,
})
export class RequestEntity {
  @Prop({ required: true })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: RequestStatus, required: true })
  status: RequestStatus;

  @Prop()
  reason?: string;

  @Prop()
  type: string;
}

export const RequestSchema = SchemaFactory.createForClass(RequestEntity);
