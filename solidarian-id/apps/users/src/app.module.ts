import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaBrokersModule } from '@solidarianid/kafka';
import { UsersModule } from './users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
    KafkaBrokersModule,
    UsersModule,
  ],
})
export class AppModule {}
