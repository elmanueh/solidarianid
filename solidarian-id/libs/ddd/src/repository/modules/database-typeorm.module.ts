import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

export interface TypeOrmConfigOptions {
  config?: ConfigService;
  entities: any[];
  migrationsPath: string;
  migrationsDistPath: string;
  database?: string;
}

export function getTypeOrmConfig(options: TypeOrmConfigOptions): TypeOrmModuleOptions {
  const { config, entities, migrationsPath, migrationsDistPath, database } = options;

  if (!config) dotenv.config();

  const nodeEnv = config?.get<string>('NODE_ENV') ?? process.env.NODE_ENV ?? 'development';
  const isProduction = nodeEnv === 'production';
  const isTest = nodeEnv === 'test';
  const shouldLoadMigrations = isProduction || isTest;

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
      migrationsTableName: 'typeorm_migrations',
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
    database: database ?? config?.get<string>('POSTGRES_DB') ?? process.env.POSTGRES_DB ?? 'solidarian_id',
    entities,
    autoLoadEntities: true,
    synchronize: !isProduction,
    migrationsRun: shouldLoadMigrations,
    migrations: shouldLoadMigrations ? [isProduction ? migrationsDistPath : migrationsPath] : [],
    migrationsTableName: 'typeorm_migrations',
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
