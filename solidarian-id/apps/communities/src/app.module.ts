import { CommunitiesModule } from '@app/communities/communities.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaBrokersModule } from '@solidarianid/kafka';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
    KafkaBrokersModule,
    CommunitiesModule,
  ],
})
export class AppModule {}
