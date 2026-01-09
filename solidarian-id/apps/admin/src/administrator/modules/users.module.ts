import { UsersConsumerServiceImpl } from '@app/admin/administrator/model/application/services/users-consumer.service.impl';
import { UsersServiceImpl } from '@app/admin/administrator/model/application/services/users.service.impl';
import { UserPdfGeneratorPort } from '@app/admin/administrator/model/domain/ports/output/user-pdf-generator.port';
import { UserRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/user.repository.port';
import { UsersConsumerService } from '@app/admin/administrator/model/domain/services/users-consumer.service';
import { UsersService } from '@app/admin/administrator/model/domain/services/users.service';
import { UserConsumerAdapter } from '@app/admin/administrator/model/infrastructure/messaging/consumer/users.consumer';
import { UserEntity, UserSchema } from '@app/admin/administrator/model/infrastructure/persistence/entities/user.entity';
import { UserMapper } from '@app/admin/administrator/model/infrastructure/persistence/mappers/user.mapper';
import { UserRepositoryMongoose } from '@app/admin/administrator/model/infrastructure/persistence/repositories/user.repository-mongoose';
import { PdfKitUserReportGenerator } from '@app/admin/administrator/model/infrastructure/report/pdfkit-user-report.generator';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserQueryRepositoryPort } from '../model/domain/ports/output/user-query.repository.port';
import { UserQueryMongooseRepository } from '../model/infrastructure/persistence/repositories/user-query.repository-mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  controllers: [UserConsumerAdapter],
  providers: [
    UserMapper,
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
    },
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryMongoose,
    },
    {
      provide: UserQueryRepositoryPort,
      useClass: UserQueryMongooseRepository,
    },
    {
      provide: UserPdfGeneratorPort,
      useClass: PdfKitUserReportGenerator,
    },
    {
      provide: UsersConsumerService,
      useClass: UsersConsumerServiceImpl,
    },
  ],
  exports: [UsersService, UserPdfGeneratorPort],
})
export class UsersModule {}
