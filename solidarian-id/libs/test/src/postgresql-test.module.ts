import { Module, DynamicModule, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreSQLTestContainer } from '@solidarianid/testing';
import { DataSource } from 'typeorm';

@Global()
@Module({})
export class PostgreSQLTestModule {
  static async forRoot(entities: any[] = []): Promise<DynamicModule> {
    const connectionString =
      await PostgreSQLTestContainer.getInstance().start();

    const module = {
      global: true,
      module: PostgreSQLTestModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          url: connectionString,
          entities,
          synchronize: true,
          dropSchema: false,
          logging: false,
        }),
      ],
      providers: [
        {
          provide: 'DataSource',
          useFactory: (dataSource: DataSource) => dataSource,
          inject: [DataSource],
        },
      ],
      exports: [TypeOrmModule, 'DataSource'],
    };

    return module;
  }
}
