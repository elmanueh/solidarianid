import { Controller, Get, Render } from '@nestjs/common';
import { fakeDashboardData, DashboardSummary, fakeDashboardSummary } from '../model/data/fakeMetrics';
import {
  createInteractiveNationalitiesDoughnut,
  createOdsByCauseBar,
  createTopCommunitiesPie,
  createMonthlyJoinsLine,
} from '../../utils/chart-builder';
import { ConfigService } from '@nestjs/config';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';

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
      this.requestsService.getPendingActionRequests(),
      this.requestsService.getPendingCauseRequests(),
      this.requestsService.getPendingCommunityRequests(),
    ]);

    return {
      title: 'Requests',
      layout: 'dashboard',
      actions: actionsResult.isRight() ? actionsResult.value : [],
      causes: causesResult.isRight() ? causesResult.value : [],
      communities: communitiesResult.isRight() ? communitiesResult.value : [],
      apiBaseUrl: this.configService.get<string>('API_BASE_ADMIN_URL'),
    };
  }

  @Get('/reports')
  @Render('pages/reports')
  reports() {
    return {
      title: 'Reportes',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_BASE_ADMIN_URL'),
    };
  }
}
