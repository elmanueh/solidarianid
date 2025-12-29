import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReportsViewController } from './controllers/reports-view.controller';
import { ReportsApiController } from './controllers/reports-api.controller';
import { UserService } from '@app/admin/administrator/model/domain/services/user.service';
import { UserServiceImpl } from '@app/admin/administrator/model/services/impl/user.service.impl';
import { UserRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/user.repository.port';
import { FakeUserRepository } from '@app/admin/administrator/model/infrastructure/persistence/fake/fake-user.repository';
import { UserPdfGeneratorPort } from './domain/ports/user-pdf-generator.port';
import { PdfKitUserReportGenerator } from './infrastructure/pdf/pdfkit-user-report.generator';

/**
 * Módulo de Reportes
 * Maneja la visualización e informes de usuarios del sistema
 *
 * Sigue arquitectura hexagonal con inyección de dependencias:
 * - UserService: Servicio de dominio para usuarios
 * - UserRepositoryPort: Puerto para acceso a datos (implementado por FakeUserRepository)
 * - UserPdfGeneratorPort: Puerto para generación de PDFs de reportes de usuario (implementado por PdfKitUserReportGenerator)
 */
@Module({
  imports: [ConfigModule],
  controllers: [ReportsViewController, ReportsApiController],
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
export class ReportsModule {}
