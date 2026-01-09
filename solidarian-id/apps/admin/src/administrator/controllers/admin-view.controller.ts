import { ActionRequestResponseDto } from '@app/admin/administrator/controllers/dtos/action-request.response.dto';
import { CauseRequestResponseDto } from '@app/admin/administrator/controllers/dtos/cause-request.response.dto';
import { CommunityRequestResponseDto } from '@app/admin/administrator/controllers/dtos/community-request.response.dto';
import {
  DashboardSummary,
  fakeDashboardData,
  fakeDashboardSummary,
} from '@app/admin/administrator/model/data/fakeMetrics';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import {
  createInteractiveNationalitiesDoughnut,
  createMonthlyJoinsLine,
  createOdsByCauseBar,
  createTopCommunitiesPie,
} from '@app/admin/utils/chart-builder';
import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Controlador de vistas para el panel de administración (MVC)
 * Maneja las rutas que renderizan las vistas del dashboard
 */
@Controller()
export class AdminViewController {
  constructor(
    private readonly configService: ConfigService,
    private readonly requestsService: RequestsService,
  ) {}

  @Get('/dashboard')
  @Render('pages/metrics')
  dashboard(): {
    title: string;
    layout: string;
    dataSummary: DashboardSummary;
    charts: string;
    apiBaseUrl?: string;
  } {
    const dataSummary = fakeDashboardSummary;
    const dataChart = fakeDashboardData;

    const charts = {
      ods: createOdsByCauseBar(dataChart.odsByCause),
      nationalities: createInteractiveNationalitiesDoughnut(dataChart.interactiveNationalities),
      topCommunities: createTopCommunitiesPie(dataChart.topCommunitiesByUsers),
      joins: createMonthlyJoinsLine(dataChart.monthlyJoinsForCommunity),
    };

    return {
      title: 'Dashboard',
      layout: 'dashboard',
      dataSummary,
      charts: JSON.stringify(charts),
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
