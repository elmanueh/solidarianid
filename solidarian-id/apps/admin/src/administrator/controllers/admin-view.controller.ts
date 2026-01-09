import { ActionRequestResponseDto } from '@app/admin/administrator/controllers/dtos/action-request.response.dto';
import { CauseRequestResponseDto } from '@app/admin/administrator/controllers/dtos/cause-request.response.dto';
import { CommunityRequestResponseDto } from '@app/admin/administrator/controllers/dtos/community-request.response.dto';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminViewService } from '@app/admin/administrator/model/domain/services/admin.service';
import { DashboardSummary } from '../model/application/services/data/dashboardSummary.data';

/**
 * Controlador de vistas para el panel de administración (MVC)
 * Maneja las rutas que renderizan las vistas del dashboard
 */
@Controller()
export class AdminViewController {
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

  @Get('/requests')
  @Render('pages/requests')
  async requests() {
    const [actionsResult, causesResult, communitiesResult] = await Promise.all([
      this.requestsService.getActionRequestsPending(),
      this.requestsService.getCauseRequestsPending(),
      this.requestsService.getCommunityRequestsPending(),
    ]);

    return {
      title: 'Requests',
      layout: 'dashboard',
      actions: actionsResult.isRight() ? actionsResult.value.map(r => ActionRequestResponseDto.toDto(r)) : [],
      causes: causesResult.isRight() ? causesResult.value.map(r => CauseRequestResponseDto.toDto(r)) : [],
      communities: communitiesResult.isRight()
        ? communitiesResult.value.map(r => CommunityRequestResponseDto.toDto(r))
        : [],
      apiBaseUrl: this.configService.get<string>('API_BASE_ADMIN_URL'),
    };
  }
}
