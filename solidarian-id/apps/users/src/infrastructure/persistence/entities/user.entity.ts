import { UserPreferenceEntity } from '@app/users/infrastructure/persistence/entities/user-preference.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tbl_Usuarios' })
export class UserEntity {
  @PrimaryColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'FullName' })
  fullName: string;

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

  @OneToOne(() => UserPreferenceEntity, preferences => preferences.user, {
    cascade: true,
    eager: false,
  })
  preferences?: UserPreferenceEntity;
}
