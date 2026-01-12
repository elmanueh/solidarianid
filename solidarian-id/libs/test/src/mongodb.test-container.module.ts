import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { MongoDBTestContainer } from '@solidarianid/testing';
import { Connection } from 'mongoose';

@Module({})
export class MongoDBTestModule {
  static async forRoot(): Promise<DynamicModule> {
    const connectionString = process.env.TEST_MONGODB_URI ?? (await MongoDBTestContainer.getInstance().start());

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
