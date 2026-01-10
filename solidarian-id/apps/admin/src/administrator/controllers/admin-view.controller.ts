import { validatePageNumber } from '@app/admin/administrator/controllers/utils';
import { BadRequestException, Controller, Get, Query, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { AdminViewService } from '@app/admin/administrator/model/domain/services/admin-view.service';
import { DashboardSummary } from '@app/admin/administrator/model/application/services/data/dashboardSummary.data';
import { CommunityRequestResponseDto } from '@app/admin/administrator/controllers/dtos/community-request.response.dto';
import { CauseRequestResponseDto } from '@app/admin/administrator/controllers/dtos/cause-request.response.dto';
import { ActionRequestResponseDto } from '@app/admin/administrator/controllers/dtos/action-request.response.dto';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';

/**
 * Controlador de vistas para el panel de administración (MVC)
 * Maneja las rutas que renderizan las vistas del dashboard
 */
@Controller()
export class AdminViewController {
  private readonly REQUESTS_PER_PAGE = 10;

  constructor(
    private readonly configService: ConfigService,
    private readonly requestsService: RequestsService,
    private readonly adminService: AdminViewService,
  ) {}

  @Get('/dashboard')
  @Render('pages/metrics')
  async dashboard(): Promise<{
    title: string;
    layout: string;
    dataSummary: DashboardSummary;
    charts: string;
    apiBaseUrl?: string;
  }> {
    const chartsJson = await this.adminService.buildDashboardViewModel();
    const dataSummary = await this.adminService.buildDashboardSummaryViewModel();
    return {
      title: 'Dashboard',
      layout: 'dashboard',
      dataSummary,
      charts: chartsJson,
      apiBaseUrl: this.configService.get<string>('API_BASE_ADMIN_URL'),
    };
  }

  @Get('/community-requests')
  @Render('pages/community-requests')
  async communitiesRequests(@Query('page') page?: string) {
    return this.getCommunitiesData(page);
  }

  @Get('/cause-requests')
  @Render('pages/cause-requests')
  async causesRequests(@Query('page') page?: string) {
    return this.getCausesData(page);
  }

  @Get('/action-requests')
  @Render('pages/action-requests')
  async actionsRequests(@Query('page') page?: string) {
    return this.getActionsData(page);
  }

  private async getCommunitiesData(page?: string): Promise<{
    title: string;
    layout: string;
    apiBaseUrl?: string;
    communities: any[];
    currentPage: number;
    totalPages: number;
    total: number;
  }> {
    const pageNumber = validatePageNumber(page);
    if (pageNumber < 1) {
      throw new BadRequestException('El número de página debe ser un entero positivo');
    }

    const result = await this.requestsService.getCommunityRequestsPending(pageNumber, this.REQUESTS_PER_PAGE);
    const data = result.isLeft()
      ? { data: [] as CommunityRequest[], total: 0, totalPages: 0, page: pageNumber, limit: this.REQUESTS_PER_PAGE }
      : (result.value as { data: CommunityRequest[]; total: number; totalPages: number; page: number });

    const mappedData = data.data.map((request: CommunityRequest) => CommunityRequestResponseDto.toDto(request));

    return {
      title: 'Solicitudes de comunidades',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_BASE_ADMIN_URL'),
      communities: mappedData,
      currentPage: data.page,
      totalPages: data.totalPages,
      total: data.total,
    };
  }

  private async getCausesData(page?: string): Promise<{
    title: string;
    layout: string;
    apiBaseUrl?: string;
    causes: any[];
    currentPage: number;
    totalPages: number;
    total: number;
  }> {
    const pageNumber = validatePageNumber(page);
    if (pageNumber < 1) {
      throw new BadRequestException('El número de página debe ser un entero positivo');
    }

    const result = await this.requestsService.getCauseRequestsPending(pageNumber, this.REQUESTS_PER_PAGE);
    const data = result.isLeft()
      ? { data: [] as CauseRequest[], total: 0, totalPages: 0, page: pageNumber, limit: this.REQUESTS_PER_PAGE }
      : (result.value as { data: CauseRequest[]; total: number; totalPages: number; page: number });

    const mappedData = data.data.map((request: CauseRequest) => CauseRequestResponseDto.toDto(request));

    return {
      title: 'Solicitudes de causas',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_BASE_ADMIN_URL'),
      causes: mappedData,
      currentPage: data.page,
      totalPages: data.totalPages,
      total: data.total,
    };
  }

  private async getActionsData(page?: string): Promise<{
    title: string;
    layout: string;
    apiBaseUrl?: string;
    actions: any[];
    currentPage: number;
    totalPages: number;
    total: number;
  }> {
    const pageNumber = validatePageNumber(page);
    if (pageNumber < 1) {
      throw new BadRequestException('El número de página debe ser un entero positivo');
    }

    const result = await this.requestsService.getActionRequestsPending(pageNumber, this.REQUESTS_PER_PAGE);
    const data = result.isLeft()
      ? { data: [], total: 0, totalPages: 0, page: pageNumber, limit: this.REQUESTS_PER_PAGE }
      : (result.value as { data: ActionRequest[]; total: number; totalPages: number; page: number });

    const mappedData = (data.data as ActionRequest[]).map((request: ActionRequest) =>
      ActionRequestResponseDto.toDto(request),
    );

    return {
      title: 'Solicitudes de acciones',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_BASE_ADMIN_URL'),
      actions: mappedData,
      currentPage: data.page,
      totalPages: data.totalPages,
      total: data.total,
    };
  }
}
