import { Controller, Get, Render } from '@nestjs/common';
import {
  fakeDashboardData,
  DashboardSummary,
  fakeDashboardSummary,
} from '../model/data/fakeMetrics';
import {
  createInteractiveNationalitiesDoughnut,
  createOdsByCauseBar,
  createTopCommunitiesPie,
  createMonthlyJoinsLine,
} from '../../utils/chart-builder';
import { ConfigService } from '@nestjs/config';

/**
 * Controlador de vistas para el panel de administración (MVC)
 * Maneja las rutas que renderizan las vistas del dashboard
 */
@Controller()
export class AdminViewController {
  constructor(private readonly configService: ConfigService) {}

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
      nationalities: createInteractiveNationalitiesDoughnut(
        dataChart.interactiveNationalities,
      ),
      topCommunities: createTopCommunitiesPie(dataChart.topCommunitiesByUsers),
      joins: createMonthlyJoinsLine(dataChart.monthlyJoinsForCommunity),
    };

    return {
      title: 'Dashboard',
      layout: 'dashboard',
      dataSummary,
      charts: JSON.stringify(charts),
      apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
    };
  }

  @Get('/requests')
  @Render('pages/requests')
  requests() {
    return {
      title: 'Requests',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
    };
  }

  @Get('/reports')
  @Render('pages/reports')
  reports() {
    return {
      title: 'Reportes',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
    };
  }
}
