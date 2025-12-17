import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { DataSource } from 'typeorm';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'solidarianid.db',
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: [],
  subscribers: [],
});
