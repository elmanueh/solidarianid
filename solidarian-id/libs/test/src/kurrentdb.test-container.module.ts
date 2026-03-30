import { DynamicModule, Global, Module } from '@nestjs/common';
import { KurrentDBTestContainer } from '@solidarianid/testing';

@Global()
@Module({})
export class KurrentDBTestModule {
  static async forRoot(): Promise<DynamicModule> {
    const connectionString = process.env.TEST_KURRENTDB_URI ?? (await KurrentDBTestContainer.getInstance().start());

    process.env.EVENT_STORE_URL = connectionString;

    return {
      global: true,
      module: KurrentDBTestModule,
      providers: [
        {
          provide: 'TEST_KURRENTDB_URI',
          useValue: connectionString,
        },
      ],
      exports: ['TEST_KURRENTDB_URI'],
    };
  }
}
