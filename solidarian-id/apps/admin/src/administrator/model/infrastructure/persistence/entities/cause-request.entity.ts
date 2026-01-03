import { RequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CauseRequestDocument = HydratedDocument<CauseRequestEntity>;

@Schema()
export class CauseRequestEntity extends RequestEntity {
  @Prop({ type: [String], enum: SustainableDevelopmentGoal, required: true })
  ods: SustainableDevelopmentGoal[];

  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true, index: true })
  communityId: string;

  @Prop({ type: [String], default: [] })
  actionsId: string[];
}

export const CauseRequestSchema = SchemaFactory.createForClass(CauseRequestEntity);

CauseRequestSchema.index({ communityId: 1 });
CauseRequestSchema.index({ actionsId: 1 });
