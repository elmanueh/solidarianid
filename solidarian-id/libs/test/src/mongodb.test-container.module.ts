import { Module, DynamicModule, Global } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { MongoDBTestContainer } from '@solidarianid/testing';
import { Connection } from 'mongoose';

@Global()
@Module({})
export class MongoDBTestModule {
  static async forRoot(): Promise<DynamicModule> {
    const connectionString = await MongoDBTestContainer.getInstance().start();

    const module = {
      global: true,
      module: MongoDBTestModule,
      imports: [
        MongooseModule.forRoot(connectionString, {
          autoIndex: true,
          autoCreate: true,
        }),
      ],
      providers: [
        {
          provide: 'Connection',
          useFactory: (connection: Connection) => connection,
          inject: [getConnectionToken()],
        },
      ],
      exports: [MongooseModule, 'Connection'],
    };

    return module;
  }
}
