import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface TypeOrmConfigOptions {
  config?: ConfigService;
  entities: any[];
  migrationsPath: string;
  migrationsDistPath: string;
  migrationsTableName?: string;
  database?: string;
  databaseEnvKey?: string;
}

export function getTypeOrmConfig(options: TypeOrmConfigOptions): TypeOrmModuleOptions {
  const { config, entities, migrationsPath, migrationsDistPath, migrationsTableName, database, databaseEnvKey } =
    options;

  if (!config) {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const envFile = resolve(process.cwd(), `.env.${nodeEnv}`);
    try {
      const envContent = readFileSync(envFile, 'utf-8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        const trimmedKey = key.trim();
        const trimmedValue = valueParts.join('=').trim();

        if (trimmedKey && !trimmedKey.startsWith('#') && trimmedValue && process.env[trimmedKey] === undefined) {
          process.env[trimmedKey] = trimmedValue;
        }
      });
    } catch {
      // Ignorar si el archivo no existe
    }
  }

  const nodeEnv = config?.get<string>('NODE_ENV') ?? process.env.NODE_ENV ?? 'development';
  const isProduction = nodeEnv === 'production';
  const isTest = nodeEnv === 'test';
  const shouldLoadMigrations = isProduction || isTest;
  const shouldSynchronize = nodeEnv === 'development';
  const resolvedMigrationsTableName = migrationsTableName ?? 'typeorm_migrations';
  const resolvedDatabase =
    database ??
    (databaseEnvKey ? (config?.get<string>(databaseEnvKey) ?? process.env[databaseEnvKey]) : undefined) ??
    config?.get<string>('POSTGRES_DB') ??
    process.env.POSTGRES_DB ??
    'solidarian_id';

  const testUri = config?.get<string>('TEST_POSTGRESQL_URI') ?? process.env.TEST_POSTGRESQL_URI;
  if (isTest && testUri) {
    return {
      type: 'postgres',
      url: testUri,
      entities,
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      migrations: shouldLoadMigrations ? [migrationsPath] : [],
      migrationsTableName: resolvedMigrationsTableName,
      migrationsTransactionMode: 'all',
      logging: false,
      extra: {
        connectionTimeoutMillis: 10000,
      },
    };
  }

  return {
    type: 'postgres',
    host: config?.get<string>('POSTGRES_HOST') ?? process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(config?.get<string>('POSTGRES_PORT') ?? process.env.POSTGRES_PORT ?? '5432'),
    username: config?.get<string>('POSTGRES_USER') ?? process.env.POSTGRES_USER ?? 'postgres',
    password: config?.get<string>('POSTGRES_PASSWORD') ?? process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: resolvedDatabase,
    entities,
    autoLoadEntities: true,
    synchronize: shouldSynchronize,
    migrationsRun: shouldLoadMigrations,
    migrations: shouldLoadMigrations ? [isProduction ? migrationsDistPath : migrationsPath] : [],
    migrationsTableName: resolvedMigrationsTableName,
    migrationsTransactionMode: 'all',
    //logging: !isProduction,
  };
}

@Module({
  imports: [ConfigModule],
})
export class DatabaseTypeOrmModule {
  static forRoot(options: TypeOrmModuleOptions): DynamicModule {
    return {
      module: DatabaseTypeOrmModule,
      imports: [TypeOrmModule.forRoot(options)],
      exports: [TypeOrmModule],
    };
  }

  static forRootAsync(options: TypeOrmModuleAsyncOptions): DynamicModule {
    return {
      module: DatabaseTypeOrmModule,
      imports: [TypeOrmModule.forRootAsync(options)],
      exports: [TypeOrmModule],
    };
  }
}
