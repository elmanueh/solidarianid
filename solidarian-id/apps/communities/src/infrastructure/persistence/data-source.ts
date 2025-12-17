import { CommunityEntity } from 'apps/communities/src/infrastructure/persistence/entities/community.entity';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [CommunityEntity],
  migrations: [],
  subscribers: [],
});
