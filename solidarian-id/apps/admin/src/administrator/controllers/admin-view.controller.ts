import { ActionRequestResponseDto } from '@app/admin/administrator/controllers/dtos/action-request.response.dto';
import { CauseRequestResponseDto } from '@app/admin/administrator/controllers/dtos/cause-request.response.dto';
import { CommunityRequestResponseDto } from '@app/admin/administrator/controllers/dtos/community-request.response.dto';
import { DashboardSummary, fakeDashboardSummary } from '@app/admin/administrator/model/data/fakeMetrics';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { UsersService } from '@app/admin/administrator/model/domain/services/users.service';
import { CommunitiesApiService } from '@app/admin/administrator/model/domain/apis/communities.service';
import { AdminDtoMapper } from '@app/admin/administrator/controllers/mappers/admin.dto.mapper';
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
    private readonly usersService: UsersService,
    private readonly communitiesApiService: CommunitiesApiService,
    private readonly adminMapper: AdminDtoMapper,
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
    const dataSummary = fakeDashboardSummary;

    const [causesResult, usersResult, communitiesResult] = await Promise.allSettled([
      this.requestsService.getCausesGroupByOds(),
      this.usersService.getUsersGroupByCountry(6),
      this.communitiesApiService.getCommunitiesOrderByMostUsers(5),
    ]);

    const odsByCauseData = causesResult.status === 'fulfilled' ? causesResult.value : undefined;
    const nationalitiesData = usersResult.status === 'fulfilled' ? usersResult.value : undefined;
    const topCommunitiesData = communitiesResult.status === 'fulfilled' ? communitiesResult.value : undefined;

    const topThreeCommunityIds = topCommunitiesData?.isRight()
      ? topCommunitiesData.value.slice(0, 3).map(community => community.id)
      : [];

    const monthlyJoinsResults = await Promise.allSettled(
      topThreeCommunityIds.map(id => this.communitiesApiService.getJoinedUsersLastMonths(id)),
    );

    console.log('Monthly Joins Results:', monthlyJoinsResults);

    const monthlyJoinsData = monthlyJoinsResults
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value)
      .filter(either => either.isRight())
      .map(either => either.value);

    console.log('Monthly Joins Data:', monthlyJoinsData);

    const charts = {
      ods: odsByCauseData?.isRight() ? createOdsByCauseBar(odsByCauseData.value) : undefined,
      nationalities: nationalitiesData?.isRight()
        ? createInteractiveNationalitiesDoughnut(nationalitiesData.value)
        : undefined,
      topCommunities: topCommunitiesData?.isRight() ? createTopCommunitiesPie(topCommunitiesData.value) : undefined,
      joins: createMonthlyJoinsLine(monthlyJoinsData),
    };

    console.log('Charts:', charts);
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
