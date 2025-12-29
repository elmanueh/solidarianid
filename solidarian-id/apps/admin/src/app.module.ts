import { AdminModule } from '@app/admin/administrator/admin.module';
import { RequestsModule } from '@app/admin/administrator/model/requests.module';
import { AppController } from '@app/admin/app.controller';
import { AuthModule } from '@app/admin/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    AdminModule,
    AuthModule,
    RequestsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
