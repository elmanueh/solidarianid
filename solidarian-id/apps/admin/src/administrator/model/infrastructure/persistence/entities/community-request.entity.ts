import { RequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommunityRequestDocument = HydratedDocument<CommunityRequestEntity>;

@Schema()
export class CommunityRequestEntity extends RequestEntity {
  @Prop({ type: [String], default: [] })
  causesId: string[];
}

export const CommunityRequestSchema = SchemaFactory.createForClass(CommunityRequestEntity);

CommunityRequestSchema.index({ causesId: 1 });
