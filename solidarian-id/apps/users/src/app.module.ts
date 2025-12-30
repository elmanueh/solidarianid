import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users.module';
import { DatabaseModule } from './database.module';
import { KafkaBrokersModule } from 'libs/kafka/src/kafka-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    KafkaBrokersModule,
    UsersModule,
  ],
})
export class AppModule {}
