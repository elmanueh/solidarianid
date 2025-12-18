import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { DataSource } from 'typeorm';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'solidarianID.db',
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: [],
  subscribers: [],
});

export async function initializeDatabase(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('Base de datos inicializada');
  }
  return AppDataSource;
}
