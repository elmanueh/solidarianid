import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'tbl_Usuarios' })
export class UserEntity {
  @PrimaryColumn('uuid', { name: 'Id' })
  id: string;

  @Column({
    name: 'MobilePhone',
    unique: true,
  })
  mobilePhone: string;

  @Column({ name: 'Username', unique: true })
  username: string;

  @Column({ name: 'PasswordHash' })
  passwordHash: string;

  @Column({ name: 'City' })
  city: string;

  @Column({ name: 'CountryCode', length: 2 })
  countryCode: string;
}
