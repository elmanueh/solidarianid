import { SustainableDevelopmentGoal } from '@app/admin/administrator/model/domain/enums/ods';
import { RequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class CauseRequestEntity extends RequestEntity {
  @Prop({ type: [Number], enum: SustainableDevelopmentGoal, required: true })
  ods: SustainableDevelopmentGoal[];

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const CauseRequestSchema =
  SchemaFactory.createForClass(CauseRequestEntity);
