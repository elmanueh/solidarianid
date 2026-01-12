import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../../domain/enums/role';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({ _id: false })
export class UserLocationSchema {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  countryCode: string;
}

@Schema({ _id: false })
export class CommunityMembershipSchema {
  @Prop({ required: true })
  communityId: string;

  @Prop({ required: true })
  communityName: string;

  @Prop({ type: String, enum: Role, required: true })
  role: Role;
}

@Schema({ collection: 'users', timestamps: true, _id: false })
export class UserEntity {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: UserLocationSchema, required: true })
  location: UserLocationSchema;

  @Prop({ type: [CommunityMembershipSchema], default: [] })
  communityMemberships: CommunityMembershipSchema[];
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
