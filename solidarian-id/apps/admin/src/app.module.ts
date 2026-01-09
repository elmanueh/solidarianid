import { AdminModule } from '@app/admin/administrator/admin.module';
import { AppController } from '@app/admin/app.controller';
import { AuthModule } from '@app/admin/auth/auth.module';
import { DatabaseMongoModule } from '@app/ddd/repository/modules/database-mongo.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaBrokersModule } from '@solidarianid/kafka';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
    KafkaBrokersModule,
    DatabaseMongoModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
