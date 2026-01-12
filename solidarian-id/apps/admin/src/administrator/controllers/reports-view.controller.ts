import { Controller, Get, Query, Render, BadRequestException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@app/admin/administrator/model/domain/services/users.service';
import type { User } from '@app/admin/administrator/model/domain/models/user';
import { AuthGuard } from '@app/admin/auth/controllers/guards/auth.guard';
import { validatePageNumber } from '@app/admin/utils/pdf-util';

/**
 * Controlador de vistas para reportes (MVC)
 * Maneja las rutas que renderizan las vistas del módulo de reportes
 * Implementa Server-Side Rendering con progressive enhancement
 */
@UseGuards(AuthGuard)
@Controller()
export class ReportsViewController {
  private readonly USERS_PER_PAGE = 6;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Renderiza la página de reportes de usuarios con SSR
   * GET /reports?page=1
   */
  @Get('/reports')
  @Render('pages/reports')
  async reports(@Query('page') page?: string): Promise<any> {
    // Validar query param page
    const pageNumber = validatePageNumber(page);
    if (pageNumber < 1) {
      throw new BadRequestException('El número de página debe ser un entero positivo');
    }

    // Obtener usuarios paginados del servicio
    const result = await this.usersService.getPaginatedUsers(pageNumber, this.USERS_PER_PAGE);

    // Manejar error del repositorio
    if (result.isLeft()) {
      return {
        title: 'Reportes de Usuarios',
        layout: 'dashboard',
        apiBaseUrl: this.configService.get<string>('API_ADMIN_BASE_URL'),
        error: result.value.message,
        users: [],
        totalUsers: 0,
        ...this.buildEmptyPagination(),
      };
    }

    const paginatedResult = result.value;

    // Validar que la página solicitada no exceda el total
    if (pageNumber > paginatedResult.totalPages && paginatedResult.totalPages > 0) {
      throw new BadRequestException(
        `La página ${pageNumber} no existe. Total de páginas: ${paginatedResult.totalPages}`,
      );
    }

    // Transformar usuarios a ViewModels
    const usersViewModel = this.mapUsersToViewModel(paginatedResult.data);

    // Calcular paginación
    const pagination = this.buildPaginationViewModel(paginatedResult.page, paginatedResult.totalPages);

    // Retornar objeto para renderizado automático con @Render
    return {
      title: 'Reportes de Usuarios',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_ADMIN_BASE_URL'),
      users: usersViewModel,
      totalUsers: paginatedResult.total,
      currentPage: paginatedResult.page,
      totalPages: paginatedResult.totalPages,
      ...pagination,
    };
  }

  /**
   * Transforma entidades User del dominio a ViewModels simples para la vista
   * @param users Array de entidades User
   * @returns Array de objetos simples con propiedades para renderizar
   */
  private mapUsersToViewModel(users: User[]) {
    return users.map(user => ({
      id: user.id.value,
      username: user.username,
      location: {
        city: user.city,
        countryCode: user.countryCode, // Solo código ISO (ES, MX, etc.)
      },
      communitiesCount: user.communityMemberships.length,
    }));
  }

  /**
   * Construye el ViewModel de paginación con páginas visibles, ellipsis, prev/next
   * @param currentPage Página actual
   * @param totalPages Total de páginas
   * @returns Objeto con estructura de paginación para la vista
   */
  private buildPaginationViewModel(currentPage: number, totalPages: number) {
    // Rango de páginas visibles (5 páginas centradas en la actual)
    const VISIBLE_PAGES = 5;
    const halfRange = Math.floor(VISIBLE_PAGES / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    // Ajustar si estamos cerca del inicio o del final
    if (currentPage <= halfRange) {
      endPage = Math.min(VISIBLE_PAGES, totalPages);
    } else if (currentPage >= totalPages - halfRange) {
      startPage = Math.max(1, totalPages - VISIBLE_PAGES + 1);
    }

    // Construir array de páginas
    const pages: Array<{
      number: number;
      isActive: boolean;
      isEllipsis: boolean;
    }> = [];

    // Primera página si no está en rango
    if (startPage > 1) {
      pages.push({ number: 1, isActive: false, isEllipsis: false });
      if (startPage > 2) {
        pages.push({ number: -1, isActive: false, isEllipsis: true }); // Ellipsis
      }
    }

    // Páginas visibles
    for (let i = startPage; i <= endPage; i++) {
      pages.push({
        number: i,
        isActive: i === currentPage,
        isEllipsis: false,
      });
    }

    // Última página si no está en rango
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push({ number: -1, isActive: false, isEllipsis: true }); // Ellipsis
      }
      pages.push({ number: totalPages, isActive: false, isEllipsis: false });
    }

    return {
      pages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
      prevPage: currentPage - 1,
      nextPage: currentPage + 1,
    };
  }

  /**
   * Construye estructura vacía de paginación para casos de error
   * @returns Objeto con paginación vacía
   */
  private buildEmptyPagination() {
    return {
      pages: [],
      hasPrev: false,
      hasNext: false,
      prevPage: 1,
      nextPage: 1,
      currentPage: 1,
      totalPages: 0,
    };
  }
}
