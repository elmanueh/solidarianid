import { AdminDtoMapper } from '@app/admin/administrator/controllers/mappers/admin.dto.mapper';
import { Injectable } from '@nestjs/common';
import { CommunitiesApiService } from '../../domain/apis/communities.service';
import { RequestsService } from '../../domain/services/requests.service';
import { UsersService } from '../../domain/services/users.service';
import { Either, fulfilledValue } from '@app/ddd/either';
import {
  createInteractiveNationalitiesDoughnut,
  createMonthlyJoinsLine,
  createOdsByCauseBar,
  createTopCommunitiesPie,
} from '@app/admin/utils/chart-builder';
import { DashboardSummary, fakeDashboardSummary } from '../../data/fakeMetrics';
import { AdminViewService } from '../../domain/services/admin.service';
import { CauseGroupByOdsData } from './cause-group-by-ods.data';
import { UserGroupByCountryData } from './user-group-by-country.data';
import { CommunityRankingUserResponseDto } from '../apis/dtos/community-ranking-user.response.dto';
import { CommunityLastUsersJoinedSummaryResponseDto } from '../apis/dtos/community-last-users-joined-summary.response.dto';

@Injectable()
export class AdminViewServiceImpl implements AdminViewService {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly usersService: UsersService,
    private readonly adminMapper: AdminDtoMapper,
    private readonly communitiesApiService: CommunitiesApiService,
  ) {}

  /*async buildDashboardViewModel() {
    const [causesSettled, usersSettled, communitiesSettled] = await Promise.allSettled([
      this.requestsService.getCausesGroupByOds(),
      this.usersService.getUsersGroupByCountry(6),
      this.communitiesApiService.getCommunitiesOrderByMostUsers(5),
    ]);

    const causesEither = fulfilledValue(causesSettled);
    const usersEither = fulfilledValue(usersSettled);
    const communitiesEither = fulfilledValue(communitiesSettled);

    const topThreeIds = communitiesEither?.isRight() ? communitiesEither.value.slice(0, 3).map(c => c.id) : [];

    const monthlyJoinsSettled = await Promise.allSettled(
      topThreeIds.map(id => this.communitiesApiService.getJoinedUsersLastMonths(id)),
    );

    const monthlyJoinsData = monthlyJoinsSettled
      .map(fulfilledValue)
      .filter((v): v is NonNullable<typeof v> => !!v)
      .filter(either => either.isRight())
      .map(either => either.value);

    const charts = {
      ods: causesEither?.isRight()
        ? createOdsByCauseBar(causesEither.value.map(d => this.adminMapper.toCauseGroupByOdsResponseDto(d)))
        : undefined,

      nationalities: usersEither?.isRight()
        ? createInteractiveNationalitiesDoughnut(
            usersEither.value.map(d => this.adminMapper.toUserGroupByCountryResponseDto(d)),
          )
        : undefined,

      topCommunities: communitiesEither?.isRight() ? createTopCommunitiesPie(communitiesEither.value) : undefined,

      joins: createMonthlyJoinsLine(monthlyJoinsData),
    };

    return {
      dataSummary: fakeDashboardSummary,
      chartsJson: JSON.stringify(charts),
    };
  }*/
  async buildDashboardViewModel(): Promise<string> {
    const [causesEither, usersEither, communitiesEither] = await this.loadMainDashboardData();

    const topThreeIds = this.topIdsFromEither(communitiesEither, 3, c => c.id);
    const monthlyJoinsData = await this.loadMonthlyJoins(topThreeIds, communitiesEither);

    console.log('Top Three IDs:', topThreeIds);
    console.log('Monthly Joins Data:', monthlyJoinsData);

    const joinsChart = monthlyJoinsData === null ? undefined : createMonthlyJoinsLine(monthlyJoinsData);
    console.log('Joins Chart:', joinsChart);

    const charts = {
      ods: this.buildOdsChart(causesEither),
      nationalities: this.buildNationalitiesChart(usersEither),
      topCommunities: this.buildTopCommunitiesChart(communitiesEither),
      joins: joinsChart,
    };

    return JSON.stringify(charts);
  }

  buildDashboardSummaryViewModel(): Promise<{ dataSummary: DashboardSummary }> {
    return Promise.resolve({
      dataSummary: fakeDashboardSummary,
    });
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
