import { AdminApiController } from '@app/admin/administrator/controllers/admin-api.controller';
import { AdminViewController } from '@app/admin/administrator/controllers/admin-view.controller';
import { ReportsViewController } from '@app/admin/administrator/controllers/reports-view.controller';
import { ReportsApiController } from '@app/admin/administrator/controllers/reports-api.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '@app/admin/administrator/model/domain/services/user.service';
import { UserServiceImpl } from '@app/admin/administrator/model/services/impl/user.service.impl';
import { UserRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/user.repository.port';
import { FakeUserRepository } from '@app/admin/administrator/model/infrastructure/persistence/fake/fake-user.repository';
import { UserPdfGeneratorPort } from '@app/admin/administrator/model/domain/ports/output/user-pdf-generator.port';
import { PdfKitUserReportGenerator } from '@app/admin/administrator/model/infrastructure/pdf/pdfkit-user-report.generator';

@Module({
  imports: [ConfigModule],
  controllers: [
    AdminViewController,
    AdminApiController,
    ReportsViewController,
    ReportsApiController,
  ],
  providers: [
    {
      provide: UserService,
      useClass: UserServiceImpl,
    },
    {
      provide: UserRepositoryPort,
      useClass: FakeUserRepository,
    },
    {
      provide: UserPdfGeneratorPort,
      useClass: PdfKitUserReportGenerator,
    },
  ],
  exports: [],
})
export class AdminModule {}
