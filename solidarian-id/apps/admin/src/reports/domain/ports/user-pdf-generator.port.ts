import type { Readable } from 'stream';
import type { UserReportPdfDto } from '../../infrastructure/pdf/user-report-pdf.dto';

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
   * @returns Promise que resuelve con un stream del PDF generado
   * @throws Error si la generación falla
   */
  abstract generate(data: UserReportPdfDto): Promise<Readable>;
}
