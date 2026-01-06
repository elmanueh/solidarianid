import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { CommunityRequestResponseDto } from '@app/admin/administrator/model/application/dtos/output/community-request.response.dto';
import { ActionRequestResponseDto } from '@app/admin/administrator/model/application/dtos/output/action-request.response.dto';
import { CauseRequestResponseDto } from '@app/admin/administrator/model/application/dtos/output/cause-request.response.dto';
import {
  DashboardSummary,
  fakeDashboardData,
  fakeDashboardSummary,
} from '@app/admin/administrator/model/data/fakeMetrics';
import {
  createInteractiveNationalitiesDoughnut,
  createMonthlyJoinsLine,
  createOdsByCauseBar,
  createTopCommunitiesPie,
} from '@app/admin/utils/chart-builder';

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
