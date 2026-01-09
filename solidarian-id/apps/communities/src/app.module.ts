import { CommunitiesModule } from '@app/communities/communities.module';
import { DatabaseSqlModule } from '@app/ddd/repository/modules/database-sql.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaBrokersModule } from '@solidarianid/kafka';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
    DatabaseSqlModule,
    KafkaBrokersModule,
    CommunitiesModule,
  ],
})
export class AppModule {}
