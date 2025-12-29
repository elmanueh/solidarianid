import { Controller, Get, Param, Query, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from '@app/admin/administrator/model/domain/services/user.service';
import { UserDtoMapper } from './mappers/user.dto.mapper';
import { PaginatedResponseDto } from '../model/application/dtos/output/paginated-response.dto';
import { UserListResponseDto } from '../model/application/dtos/output/user-list-response.dto';
import { UserDetailResponseDto } from '../model/application/dtos/output/user-detail-response.dto';
import { UserPdfGeneratorPort } from '@app/admin/administrator/model/domain/ports/output/user-pdf-generator.port';
import type { UserReportPdfDto } from '@app/admin/administrator/model/infrastructure/pdf/user-report-pdf.dto';
import type { CommunityMembership } from '@app/admin/administrator/model/domain/value-objects/community-membership';

/**
 * Controlador API para reportes
 * Maneja las peticiones REST del módulo de reportes de usuarios
 *
 * Utiliza inyección de dependencias siguiendo arquitectura hexagonal:
 * - UserService: Para obtener datos de usuarios
 * - UserPdfGeneratorPort: Para generar PDFs de reportes de usuario
 */
@Controller('/api/reports')
export class ReportsApiController {
  private readonly USERS_PER_PAGE = 5;

  constructor(
    private readonly userService: UserService,
    private readonly pdfGenerator: UserPdfGeneratorPort,
  ) {}

  /**
   * Obtiene lista paginada de usuarios
   * GET /api/reports/users?page=1
   */
  @Get('/users')
  async getUsers(
    @Query('page') page?: string,
    @Res() response: Response = {} as Response,
  ): Promise<Response> {
    const pageNumber = page ? parseInt(page, 10) : 1;

    // Validar que sea un número válido
    if (isNaN(pageNumber) || pageNumber < 1) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Page must be a positive integer',
        timestamp: new Date().toISOString(),
      });
    }

    const result = await this.userService.getPaginatedUsers(
      pageNumber,
      this.USERS_PER_PAGE,
    );

    if (result.isLeft()) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: result.value.message,
        timestamp: new Date().toISOString(),
      });
    }

    const paginatedResult = result.value;

    // Mapear usuarios a DTOs
    const userDtos = paginatedResult.data.map((user) =>
      UserDtoMapper.toListDto(user),
    );

    // Crear respuesta paginada
    const responseDto = new PaginatedResponseDto<UserListResponseDto>(
      userDtos,
      paginatedResult.page,
      paginatedResult.limit,
      paginatedResult.total,
    );

    return response.status(HttpStatus.OK).json(responseDto);
  }

  /**
   * Obtiene detalle completo de un usuario
   * GET /api/reports/users/:id
   */
  @Get('/users/:id')
  async getUserDetail(
    @Param('id') id: string,
    @Res() response: Response = {} as Response,
  ): Promise<Response> {
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
    const userDetailDto: UserDetailResponseDto =
      UserDtoMapper.toDetailDto(user);

    return response.status(HttpStatus.OK).json(userDetailDto);
  }

  /**
   * Descarga PDF del reporte de usuario
   * GET /api/reports/users/:id/pdf
   */
  @Get('/users/:id/pdf')
  async downloadUserPdf(
    @Param('id') id: string,
    @Res() response: Response = {} as Response,
  ): Promise<Response> {
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
      username: user.username,
      phone: user.phone,
      city: user.city,
      countryCode: user.countryCode,
      countryName: countryNames[user.countryCode] || user.countryCode,
      communities: user.communityMemberships.map(
        (membership: CommunityMembership) => ({
          id: membership.communityId,
          name: membership.communityName,
          isAdmin: membership.isAdmin,
        }),
      ),
      generatedAt: new Date(),
    };

    try {
      // Generar PDF
      const pdfStream = await this.pdfGenerator.generate(pdfData);

      // Configurar headers de respuesta
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader(
        'Content-Disposition',
        `attachment; filename="reporte-${user.username}-${Date.now()}.pdf"`,
      );

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
