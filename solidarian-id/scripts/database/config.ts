import { config } from 'dotenv';
import { join } from 'node:path';

config({ path: join(__dirname, '../../.env.production') });

export const DB_CONFIG = {
  postgres: {
    container: 'solidarian_postgres_db',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || '5432',
    user: process.env.POSTGRES_USER || 'solidarian_user',
    password: process.env.POSTGRES_PASSWORD || 'solidarian_dev_password',
    database: process.env.POSTGRES_USERS_DB || process.env.POSTGRES_DB || 'solidarian_users_db',
    usersDatabase: process.env.POSTGRES_USERS_DB || 'solidarian_users_db',
    communitiesDatabase: process.env.POSTGRES_COMMUNITIES_DB || 'solidarian_communities_db',
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
    schemaUsers: join(__dirname, '../init/postgres/01-schema-users.sql'),
    schemaCommunities: join(__dirname, '../init/postgres/01-schema-communities.sql'),
    schema: join(__dirname, '../init/postgres/01-schema.sql'),
    dataUsers: join(__dirname, '../init/postgres/02-seed-users.sql'),
    dataCommunities: join(__dirname, '../init/postgres/02-seed-communities.sql'),
    data: join(__dirname, '../init/postgres/02-seed.sql'),
  },
  mongo: {
    dir: join(__dirname, '../init/mongo'),
    data: join(__dirname, '../init/mongo/01-seed.js'),
  },
} as const;
