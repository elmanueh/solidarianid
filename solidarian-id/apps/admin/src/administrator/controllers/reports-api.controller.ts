import { UserDtoMapper } from '@app/admin/administrator/controllers/mappers/user.dto.mapper';
import { UserDetailResponseDto } from '@app/admin/administrator/model/application/dtos/output/user-detail.response.dto';
import { UserPdfGeneratorPort } from '@app/admin/administrator/model/domain/ports/output/user-pdf-generator.port';
import { UsersService } from '@app/admin/administrator/model/domain/services/users.service';
import type { CommunityMembership } from '@app/admin/administrator/model/domain/value-objects/community-membership';
import type { UserReportPdfDto } from '@app/admin/administrator/model/infrastructure/report/user-report-pdf.dto';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import type { Response } from 'express';

/**
 * Controlador API para reportes
 * Maneja las peticiones REST del módulo de reportes de usuarios
 *
 * Utiliza inyección de dependencias siguiendo arquitectura hexagonal:
 * - UsersService: Para obtener datos de usuarios
 * - UserPdfGeneratorPort: Para generar PDFs de reportes de usuario
 */
@Controller('/api/reports')
export class ReportsApiController {
  constructor(
    private readonly userService: UsersService,
    private readonly pdfGenerator: UserPdfGeneratorPort,
  ) {}

  /**
   * Obtiene detalle completo de un usuario
   * GET /api/reports/users/:id
   */
  @Get('/users/:id')
  async getUserDetail(@Param('id') id: string, @Res() response: Response = {} as Response): Promise<Response> {
    const result = await this.userService.getUserById(id);

    if (result.isLeft()) {
      const error = result.value;
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }

    const user = result.value;
    const userDetailDto: UserDetailResponseDto = UserDtoMapper.toDetailDto(user);

    return response.status(HttpStatus.OK).json(userDetailDto);
  }

  /**
   * Descarga PDF del reporte de usuario
   * GET /api/reports/users/:id/pdf
   */
  @Get('/users/:id/pdf')
  async downloadUserPdf(@Param('id') id: string, @Res() response: Response = {} as Response): Promise<Response> {
    // Obtener datos del usuario
    const result = await this.userService.getUserById(id);

    if (result.isLeft()) {
      const error = result.value;
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }

    const user = result.value;

    // Mapear a nombres de país
    const countryNames: Record<string, string> = {
      ES: 'España',
      MX: 'México',
      AR: 'Argentina',
      CO: 'Colombia',
      CL: 'Chile',
      PE: 'Perú',
      EC: 'Ecuador',
    };

    // Preparar datos para el PDF
    const pdfData: UserReportPdfDto = {
      id: user.id.value,
      fullName: user.fullName,
      username: user.username,
      phone: user.phone,
      city: user.city,
      countryCode: user.countryCode,
      countryName: countryNames[user.countryCode] || user.countryCode,
      communities: user.communityMemberships.map((membership: CommunityMembership) => ({
        id: membership.communityId,
        name: membership.communityName,
        isAdmin: membership.isAdmin,
      })),
      generatedAt: new Date(),
    };

    try {
      // Generar PDF
      const pdfStream = await this.pdfGenerator.generate(pdfData);

      // Configurar headers de respuesta
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader('Content-Disposition', `attachment; filename="reporte-${user.username}-${Date.now()}.pdf"`);

      // Pipe el stream al response
      pdfStream.pipe(response);

      return response;
    } catch {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error generating PDF report',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
