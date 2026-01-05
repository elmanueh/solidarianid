import { AdminApiController } from '@app/admin/administrator/controllers/admin-api.controller';
import { AdminViewController } from '@app/admin/administrator/controllers/admin-view.controller';
import { ReportsViewController } from '@app/admin/administrator/controllers/reports-view.controller';
import { ReportsApiController } from '@app/admin/administrator/controllers/reports-api.controller';
import { RequestsModule } from '@app/admin/administrator/requests.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '@app/admin/administrator/model/domain/services/users.service';
import { UsersServiceImpl } from '@app/admin/administrator/model/application/services/users.service.impl';
import { UserRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/user.repository.port';
import { UserRepositoryMongoose } from '@app/admin/administrator/model/infrastructure/persistence/repositories/user.repository-mongoose';
import { UserPdfGeneratorPort } from '@app/admin/administrator/model/domain/ports/output/user-pdf-generator.port';
import { PdfKitUserReportGenerator } from '@app/admin/administrator/model/infrastructure/pdf/pdfkit-user-report.generator';
import { UsersConsumerService } from '@app/admin/administrator/model/domain/services/users-consumer.service';
import { UsersConsumerServiceImpl } from '@app/admin/administrator/model/application/services/users-consumer.service.impl';
import { UserConsumerAdapter } from '@app/admin/administrator/model/infrastructure/messaging/consumer/users.consumer';
import { UserMapper } from '@app/admin/administrator/model/infrastructure/persistence/mappers/user.mapper';
import { UserEntity, UserSchema } from '@app/admin/administrator/model/infrastructure/persistence/entities/user.entity';

@Module({
  imports: [ConfigModule, RequestsModule, MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  controllers: [
    UserConsumerAdapter,
    AdminViewController,
    AdminApiController,
    ReportsViewController,
    ReportsApiController,
  ],
  providers: [
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
    },
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryMongoose,
    },
    {
      provide: UserPdfGeneratorPort,
      useClass: PdfKitUserReportGenerator,
    },
    {
      provide: UsersConsumerService,
      useClass: UsersConsumerServiceImpl,
    },
    UserMapper,
  ],
  exports: [],
})
export class AdminModule {}
