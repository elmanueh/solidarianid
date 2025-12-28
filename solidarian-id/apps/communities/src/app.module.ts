import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'apps/communities/src/database.module';
import { CommunitiesModule } from '@app/communities/communities/communities.module';
import { CausesModule } from '@app/communities/causes/causes.module';
import { ActionsModule } from '@app/communities/actions/actions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    CommunitiesModule,
    CausesModule,
    ActionsModule,
  ],
})
export class AppModule {}
