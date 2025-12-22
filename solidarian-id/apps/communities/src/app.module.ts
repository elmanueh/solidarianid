import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommunitiesModule } from 'apps/communities/src/communities.module';
import { DatabaseModule } from 'apps/communities/src/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    CommunitiesModule,
  ],
})
export class AppModule {}
