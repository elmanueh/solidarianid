import { createBarConfig } from '@charts/bar';
import { createDoughnutConfig } from '@charts/doughnut';
import { createLineConfig } from '@charts/line';
import { createPieConfig } from '@charts/pie';
import { odsNames } from './data-utils';
import { SerializableChartConfig } from '@charts/plugins/plugins';
import { CommunityRankingUserResponseDto } from '../administrator/model/infrastructure/apis/dtos/community-ranking-user.response.dto';
import { CommunityLastUsersJoinedSummaryResponseDto } from '../administrator/model/infrastructure/apis/dtos/community-last-users-joined-summary.response.dto';
import { UserGroupByCountryResponseDto } from '../administrator/controllers/dtos/user-group-by-country.response.dto';
import { CauseGroupByOdsResponseDto } from '../administrator/controllers/dtos/cause-group-by-ods.response.dto';

export function createTopCommunitiesPie(
  topCommunitiesByUser: CommunityRankingUserResponseDto[],
): SerializableChartConfig {
  const labels = topCommunitiesByUser.map(({ name }) => name);
  const values = topCommunitiesByUser.map(({ userCount }) => userCount);

  return createPieConfig({
    title: 'Comunidades con más usuarios',
    labels,
    values,
    tooltipCallbacks: {
      label: `(item) => \`Número de usuarios: \${item.formattedValue}\``,
    },
  });
}

export function createInteractiveNationalitiesDoughnut(
  nationalitiesData: UserGroupByCountryResponseDto[],
): SerializableChartConfig {
  const labels = nationalitiesData.map(({ country }) => country);
  const values = nationalitiesData.map(({ userCount }) => userCount);

  return createDoughnutConfig({
    title: 'Nacionalidades más comunes',
    labels,
    values,
    cutout: '50%',
    tooltipCallbacks: {
      label: `(item) => \`Número de usuarios: \${item.formattedValue}\``,
    },
  });
}

export function createOdsByCauseBar(odsByCauseData: CauseGroupByOdsResponseDto[]): SerializableChartConfig {
  const labels = odsByCauseData.map(({ ods }) => ods.toString());
  const values = odsByCauseData.map(({ causeCount }) => causeCount);

  return createBarConfig({
    title: 'Número de causas por ODS',
    labels,
    values,
    horizontal: false,
    legend: false,
    tooltipCallbacks: {
      title: `(items) => {
          const ods = String(items[0].label);
          const odsNames = ${JSON.stringify(odsNames)};
          return \`ODS \${ods} — \${odsNames[ods] ?? ''}\`;
        }`,
      label: `(item) => \`Causas: \${item.formattedValue}\``,
    },
  });
}

export function createMonthlyJoinsLine(data: CommunityLastUsersJoinedSummaryResponseDto[]): SerializableChartConfig {
  const hasData = data && data.length > 0 && data[0]?.dataRange && data[0].dataRange.length > 0;

  return createLineConfig({
    title: 'Comparativa de uniones mensuales',
    labels: hasData ? data[0].dataRange.map(({ month }) => month) : [],
    series: hasData
      ? data.map(communityData => ({
          label: communityData.communityName,
          values: communityData.dataRange.map(({ userCount }) => userCount),
        }))
      : [],
    tension: 0.1,
    tooltipCallbacks: {
      label: `(item) => \`Usuarios nuevos: \${item.formattedValue}\``,
    },
  });
}
