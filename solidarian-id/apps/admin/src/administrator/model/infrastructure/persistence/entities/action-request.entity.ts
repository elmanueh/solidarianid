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
  @Prop({ type: [ObjectiveEmbeddedSchema], default: [] })
  objectives: ObjectiveEmbedded[];

  @Prop({ type: [EventEmbeddedSchema], default: [] })
  events: EventEmbedded[];

  @Prop({ required: true, index: true })
  causeId: string;
}

export const ActionRequestSchema = SchemaFactory.createForClass(ActionRequestEntity);
