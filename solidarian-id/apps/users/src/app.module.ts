import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users.module';
import { KafkaBrokersModule } from 'libs/kafka/src/kafka-config.module';
import { DatabaseSqlModule } from '@app/ddd/repository/modules/database-sql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
    DatabaseSqlModule,
    KafkaBrokersModule,
    UsersModule,
  ],
})
export class AppModule {}
