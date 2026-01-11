import { UserDetailResponseDto } from '@app/admin/administrator/controllers/dtos/user-detail.response.dto';
import { UserDtoMapper } from '@app/admin/administrator/controllers/mappers/user.dto.mapper';
import {
  UserPdfGeneratorPort,
  type UserReportPdfCommand,
} from '@app/admin/administrator/model/domain/ports/output/user-pdf-generator.port';
import { UsersService } from '@app/admin/administrator/model/domain/services/users.service';
import type { CommunityMembership } from '@app/admin/administrator/model/domain/value-objects/community-membership';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('/api/reports')
export class ReportsApiController {
  constructor(
    private readonly userService: UsersService,
    private readonly pdfGenerator: UserPdfGeneratorPort,
  ) {}

  @Get('/users/:id')
  async getUserDetail(@Param('id') id: string): Promise<UserDetailResponseDto> {
    const result = await this.userService.getUserById(id);

    if (result.isLeft()) {
      throw result.value;
    }

    const user = result.value;
    return UserDtoMapper.toDetailDto(user);
  }

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

    const pdfData: UserReportPdfCommand = {
      id: user.id.value,
      fullName: user.fullName,
      username: user.username,
      phone: user.phone,
      city: user.city,
      countryCode: user.countryCode,
      communities: user.communityMemberships.map((membership: CommunityMembership) => ({
        id: membership.communityId,
        name: membership.communityName,
        role: membership.role,
      })),
      generatedAt: new Date(),
    };

    // Generar PDF
    const pdfResult = this.pdfGenerator.generate(pdfData);

    if (pdfResult.isLeft()) {
      throw pdfResult.value;
    }

    const pdfStream = pdfResult.value;

    // Configurar headers de respuesta
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', `attachment; filename="reporte-${user.username}-${Date.now()}.pdf"`);

    // Pipe el stream al response
    pdfStream.pipe(response);

    return response;
  }
}
