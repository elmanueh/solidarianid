import { AdminDtoMapper } from '@app/admin/administrator/controllers/mappers/admin.dto.mapper';
import { Injectable } from '@nestjs/common';
import { CommunitiesApiPort } from '../../domain/ports/output/communities.api.port';
import { RequestsService } from '../../domain/services/requests.service';
import { UsersService } from '../../domain/services/users.service';
import { Either, fulfilledValue } from '@app/ddd/either';
import {
  createInteractiveNationalitiesDoughnut,
  createMonthlyJoinsLine,
  createOdsByCauseBar,
  createTopCommunitiesPie,
} from '@app/admin/utils/chart-builder';
import { DashboardSummary } from './data/dashboardSummary.data';
import { AdminViewService } from '../../domain/services/admin-view.service';
import { CauseGroupByOdsData } from './data/cause-group-by-ods.data';
import { UserGroupByCountryData } from './data/user-group-by-country.data';
import { CommunityRankingUserResponseDto } from '../../infrastructure/apis/dtos/community-ranking-user.response.dto';
import { CommunityLastUsersJoinedSummaryResponseDto } from '../../infrastructure/apis/dtos/community-last-users-joined-summary.response.dto';
import { RequestStatus } from '../../domain/enums/request-status';
import { RequestType } from '../../domain/enums/request-type';

@Injectable()
export class AdminViewServiceImpl implements AdminViewService {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly usersService: UsersService,
    private readonly adminMapper: AdminDtoMapper,
    private readonly communitiesApiService: CommunitiesApiPort,
  ) {}

  async buildDashboardViewModel(): Promise<string> {
    const [causesEither, usersEither, communitiesEither] = await this.loadMainDashboardData();

    const topThreeIds = this.topIdsFromEither(communitiesEither, 3, c => c.id);
    const monthlyJoinsData = await this.loadMonthlyJoins(topThreeIds, communitiesEither);
    if (monthlyJoinsData != null) {
      monthlyJoinsData.forEach(monthlyJoinData => {
        monthlyJoinData.dataRange.reverse();
      });
    }

    const joinsChart = monthlyJoinsData === null ? undefined : createMonthlyJoinsLine(monthlyJoinsData);

    const charts = {
      ods: this.buildOdsChart(causesEither),
      nationalities: this.buildNationalitiesChart(usersEither),
      topCommunities: this.buildTopCommunitiesChart(communitiesEither),
      joins: joinsChart,
    };

    return JSON.stringify(charts);
  }

  async buildDashboardSummaryViewModel(): Promise<DashboardSummary> {
    const { totalUsersEither, totalCommunitiesEither, totalCausesEither, totalActionsEither } =
      await this.loadSummaryDashboardData();
    return {
      totalUsers: totalUsersEither?.isRight() ? totalUsersEither.value : 0,
      totalComunities: totalCommunitiesEither?.isRight() ? totalCommunitiesEither.value : 0,
      totalCauses: totalCausesEither?.isRight() ? totalCausesEither.value : 0,
      totalActions: totalActionsEither?.isRight() ? totalActionsEither.value : 0,
    };
  }

  private async loadMainDashboardData() {
    const settled = await Promise.allSettled([
      this.requestsService.getCausesGroupByOds(),
      this.usersService.getUsersGroupByCountry(6),
      this.communitiesApiService.getCommunitiesOrderByMostUsers(5),
    ]);

    const causesEither = fulfilledValue(settled[0]);
    const usersEither = fulfilledValue(settled[1]);
    const communitiesEither = fulfilledValue(settled[2]);

    return [causesEither, usersEither, communitiesEither] as const;
  }

  private async loadSummaryDashboardData() {
    const settled = await Promise.allSettled([
      this.usersService.getTotalUsers(),
      this.requestsService.getCountByStatusAndType(RequestStatus.APPROVED, RequestType.COMMUNITY),
      this.requestsService.getCountByStatusAndType(RequestStatus.APPROVED, RequestType.CAUSE),
      this.requestsService.getCountByStatusAndType(RequestStatus.APPROVED, RequestType.ACTION),
    ]);
    const totalUsersEither = fulfilledValue(settled[0]);
    const totalCommunitiesEither = fulfilledValue(settled[1]);
    const totalCausesEither = fulfilledValue(settled[2]);
    const totalActionsEither = fulfilledValue(settled[3]);

    return {
      totalUsersEither,
      totalCommunitiesEither,
      totalCausesEither,
      totalActionsEither,
    };
  }

  private topIdsFromEither<L, T>(
    either: Either<L, T[]> | undefined,
    take: number,
    selector: (t: T) => string,
  ): string[] {
    if (!either?.isRight()) return [];
    return either.value.slice(0, take).map(selector);
  }

  private async loadMonthlyJoins(
    topCommunityIds: string[],
    communitiesEither?: Either<any, any[]>,
  ): Promise<CommunityLastUsersJoinedSummaryResponseDto[] | null> {
    if (!communitiesEither?.isRight()) {
      return null;
    }

    if (topCommunityIds.length === 0) {
      return [];
    }

    const settled = await Promise.allSettled(
      topCommunityIds.map(id => this.communitiesApiService.getJoinedUsersLastMonths(id)),
    );

    const results = settled
      .map(fulfilledValue)
      .filter((e): e is NonNullable<typeof e> => !!e)
      .filter(e => e.isRight())
      .map(e => e.value);

    return settled.every(s => s.status === 'rejected') ? null : results;
  }

  private buildOdsChart<L>(causesEither?: Either<L, CauseGroupByOdsData[]>) {
    if (!causesEither?.isRight()) return undefined;
    const dto = causesEither.value.map(d => this.adminMapper.toCauseGroupByOdsResponseDto(d));
    return createOdsByCauseBar(dto);
  }

  private buildNationalitiesChart<L>(usersEither?: Either<L, UserGroupByCountryData[]>) {
    if (!usersEither?.isRight()) return undefined;
    const dto = usersEither.value.map(d => this.adminMapper.toUserGroupByCountryResponseDto(d));
    return createInteractiveNationalitiesDoughnut(dto);
  }

  private buildTopCommunitiesChart<L>(communitiesEither?: Either<L, CommunityRankingUserResponseDto[]>) {
    if (!communitiesEither?.isRight()) return undefined;
    return createTopCommunitiesPie(communitiesEither.value);
  }
}
