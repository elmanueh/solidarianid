import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'tbl_Usuarios' })
export class UserEntity {
  @PrimaryColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'MobilePhone', unique: true })
  mobilePhone: string;

  @Column({ name: 'Username' })
  username: string;

  @Column({ name: 'HashedPassword', length: 255 })
  hashedPassword: string;
}
