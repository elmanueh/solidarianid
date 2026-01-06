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
import {
  ActionRequestResponseDto,
  CauseRequestResponseDto,
  CommunityRequestResponseDto,
} from '@app/admin/administrator/model/application/dtos/get-community-request.dto';
import {
  fakeActionRequests,
  fakeCauseRequests,
  fakeCommunityRequests,
} from '@app/admin/administrator/controllers/fakeData';

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
  requests() {
    // const [actionsResult, causesResult, communitiesResult] = await Promise.all([
    //   this.requestsService.getActionRequestsPending(),
    //   this.requestsService.getCauseRequestsPending(),
    //   this.requestsService.getCommunityRequestsPending(),
    // ]);

    return {
      title: 'Requests',
      layout: 'dashboard',
      // actions: actionsResult.isRight() ? actionsResult.value.map(r => ActionRequestResponseDto.toDto(r)) : [],
      // causes: causesResult.isRight() ? causesResult.value.map(r => CauseRequestResponseDto.toDto(r)) : [],
      // communities: communitiesResult.isRight()
      //   ? communitiesResult.value.map(r => CommunityRequestResponseDto.toDto(r))
      //   : [],
      actions: fakeActionRequests,
      causes: fakeCauseRequests,
      communities: fakeCommunityRequests,
      apiBaseUrl: this.configService.get<string>('API_BASE_ADMIN_URL'),
    };
  }
}
