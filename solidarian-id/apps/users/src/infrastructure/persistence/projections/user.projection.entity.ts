import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_projection' })
export class UserProjectionEntity {
  @PrimaryColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'mobile_phone', unique: true })
  mobilePhone: string;
}
