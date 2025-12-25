import { AdminModule } from '@app/admin/administrator/admin.module';
import { RequestsModule } from '@app/admin/administrator/model/requests.module';
import { AppController } from '@app/admin/app.controller';
import { AuthModule } from '@app/admin/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AdminModule,
    AuthModule,
    RequestsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
