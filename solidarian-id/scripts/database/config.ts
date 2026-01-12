import { config } from 'dotenv';
import { join } from 'node:path';

config({ path: join(__dirname, '../../.env.development') });

export const DB_CONFIG = {
  postgres: {
    container: 'solidarian_postgres_db',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || '5432',
    user: process.env.POSTGRES_USER || 'solidarian_user',
    password: process.env.POSTGRES_PASSWORD || 'solidarian_dev_password',
    database: process.env.POSTGRES_DB || 'solidarian_id_db',
  },
  mongo: {
    container: 'solidarian_mongo_db',
    user: process.env.MONGO_USER || 'test',
    password: process.env.MONGO_PASSWORD || 'test',
    database: process.env.MONGO_DB || 'solidarianid',
    authDatabase: 'admin',
  },
} as const;

export const OUTPUT_PATHS = {
  postgres: {
    dir: join(__dirname, '../init/postgres'),
    schema: join(__dirname, '../init/postgres/init-01-schema.sql'),
    data: join(__dirname, '../init/postgres/init-02-seed-data.sql'),
  },
  mongo: {
    dir: join(__dirname, '../init/mongo'),
    data: join(__dirname, '../init/mongo/init-01-seed-data.js'),
  },
} as const;
