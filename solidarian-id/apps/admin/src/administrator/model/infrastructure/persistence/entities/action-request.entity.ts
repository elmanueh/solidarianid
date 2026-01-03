import { RequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import {
  EventEmbedded,
  EventEmbeddedSchema,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/embedded/event.embedded';
import {
  ObjectiveEmbedded,
  ObjectiveEmbeddedSchema,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/embedded/objective.embedded';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActionRequestDocument = HydratedDocument<ActionRequestEntity>;

@Schema()
export class ActionRequestEntity extends RequestEntity {
  @Prop({ required: true, index: true })
  causeId: string;

  @Prop({ type: [ObjectiveEmbeddedSchema], default: [] })
  objectives: ObjectiveEmbedded[];

  @Prop({ type: [EventEmbeddedSchema], default: [] })
  events: EventEmbedded[];
}

export const ActionRequestSchema = SchemaFactory.createForClass(ActionRequestEntity);

ActionRequestSchema.index({ causeId: 1 });
