import type { Readable } from 'node:stream';
import { Either } from '@app/ddd/either';
import { PdfGenerationException } from '@app/admin/administrator/model/domain/errors/pdf-generation.exception';

// DTO con los datos necesarios para generar el PDF del reporte de usuario
export interface UserReportPdfCommand {
  id: string;
  fullName: string;
  username: string;
  phone: string;
  city: string;
  countryCode: string;
  communities: CommunityPdfCommand[];
  generatedAt: Date;
}

// DTO de comunidad para el PDF
export interface CommunityPdfCommand {
  id: string;
  name: string;
  isAdmin: boolean;
}

/**
 * Puerto (interfaz) para la generación de PDFs de reportes de usuario
 *
 * Define el contrato que debe cumplir cualquier implementación
 * de generador de PDF de reportes de usuario siguiendo arquitectura hexagonal.
 *
 * Este puerto permite desacoplar la lógica de negocio de la
 * implementación específica (PDFKit, puppeteer, etc.)
 */
export abstract class UserPdfGeneratorPort {
  /**
   * Genera un documento PDF de reporte de usuario
   *
   * @param data Datos del usuario para generar el reporte PDF
   * @returns Either con error de generación de PDF o stream del PDF generado
   */
  abstract generate(data: UserReportPdfCommand): Either<PdfGenerationException, Readable>;
}
