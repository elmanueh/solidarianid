import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = resolve(process.cwd(), `.env.${nodeEnv}`);
try {
  const envContent = readFileSync(envFile, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    const trimmedKey = key.trim();
    const trimmedValue = valueParts.join('=').trim();

    if (trimmedKey && !trimmedKey.startsWith('#') && trimmedValue) {
      process.env[trimmedKey] = trimmedValue;
    }
  });
} catch {
  // Ignorar si el archivo no existe
}

import { DataSource } from 'typeorm';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { UserPreferenceEntity } from './entities/user-preference.entity';
import { UserEntity } from './entities/user.entity';

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

let dbConfig: any;

if (isTest && process.env.TEST_POSTGRESQL_URI) {
  dbConfig = {
    type: 'postgres',
    url: process.env.TEST_POSTGRESQL_URI,
    synchronize: false,
    migrationsRun: true,
  };
} else {
  dbConfig = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number.parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'solidarian_id',
    synchronize: !isProduction,
    migrationsRun: isProduction,
    logging: false,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const AppDataSource = new DataSource({
  ...dbConfig,
  entities: [UserEntity, UserPreferenceEntity, RefreshTokenEntity],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/apps/users/src/infrastructure/persistence/migrations/*.js'
      : 'apps/users/src/infrastructure/persistence/migrations/*.ts',
  ],
  migrationsTableName: 'typeorm_migrations_users',
});

export default AppDataSource;
