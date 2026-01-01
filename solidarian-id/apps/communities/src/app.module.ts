import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { CommunitiesModule } from './communities.module';
import { KafkaBrokersModule } from 'libs/kafka/src/kafka-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    KafkaBrokersModule,
    CommunitiesModule,
  ],
})
export class AppModule {}
