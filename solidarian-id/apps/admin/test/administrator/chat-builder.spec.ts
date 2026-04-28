import {
  createTopCommunitiesPie,
  createInteractiveNationalitiesDoughnut,
  createOdsByCauseBar,
  createMonthlyJoinsLine,
} from '@app/admin/utils/chart-builder';
import { UserGroupByCountryResponseDto } from '@app/admin/administrator/controllers/dtos/user-group-by-country.response.dto';
import { CauseGroupByOdsResponseDto } from '@app/admin/administrator/controllers/dtos/cause-group-by-ods.response.dto';
import { CommunityLastUsersJoinedSummaryResponseDto } from '@app/admin/administrator/model/infrastructure/apis/dtos/community-last-users-joined-summary.response.dto';
import { CommunityRankingUserResponseDto } from '@app/admin/administrator/model/infrastructure/apis/dtos/community-ranking-user.response.dto';

describe('createTopCommunitiesPie', () => {
  const communityRanking: CommunityRankingUserResponseDto[] = [
    {
      id: '3f2b7c6e-9c41-4a87-8f3d-2b5a6e1c9a42',
      name: 'Community A',
      userCount: 150,
    },
    {
      id: '7a1d5e4b-2c3f-4d5e-8f6a-1b2c3d4e5f6a',
      name: 'Community B',
      userCount: 100,
    },
  ];

  it('should create pie chart config for top communities', () => {
    const chartConfig = createTopCommunitiesPie(communityRanking);

    expect(chartConfig).toEqual({
      type: 'pie',
      data: {
        labels: ['Community A', 'Community B'],
        datasets: [
          {
            label: 'Comunidades con más usuarios',
            data: [150, 100],
          },
        ],
      },
      options: {
        responsive: true,
        animation: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          title: {
            display: true,
            text: 'Comunidades con más usuarios',
          },
        },
      },
      _serializedCallbacks: {
        tooltip: {
          label: `(item) => \`Número de usuarios: \${item.formattedValue}\``,
        },
      },
    });
  });

  it('should handle empty input array', () => {
    const chartConfig = createTopCommunitiesPie([]);

    expect(chartConfig.data.labels).toEqual([]);
    expect(chartConfig.data.datasets[0].data).toEqual([]);
  });
});

describe('createInteractiveNationalitiesDoughnut', () => {
  const nationalitiesData: UserGroupByCountryResponseDto[] = [
    {
      country: 'España',
      userCount: 200,
    },
    {
      country: 'México',
      userCount: 150,
    },
    {
      country: 'Argentina',
      userCount: 100,
    },
  ];

  it('should create doughnut chart config for nationalities', () => {
    const chartConfig = createInteractiveNationalitiesDoughnut(nationalitiesData);

    expect(chartConfig).toEqual({
      type: 'doughnut',
      data: {
        labels: ['España', 'México', 'Argentina'],
        datasets: [
          {
            label: 'Nacionalidades más comunes',
            data: [200, 150, 100],
          },
        ],
      },
      options: {
        responsive: true,
        animation: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        cutout: '50%',
        plugins: {
          title: {
            display: true,
            text: 'Nacionalidades más comunes',
          },
        },
      },
      _serializedCallbacks: {
        tooltip: {
          label: `(item) => \`Número de usuarios: \${item.formattedValue}\``,
        },
      },
    });
  });

  it('should handle empty input array', () => {
    const chartConfig = createInteractiveNationalitiesDoughnut([]);

    expect(chartConfig.data.labels).toEqual([]);
    expect(chartConfig.data.datasets[0].data).toEqual([]);
  });
});

describe('createOdsByCauseBar', () => {
  const odsByCauseData: CauseGroupByOdsResponseDto[] = [
    {
      ods: 1,
      causeCount: 25,
    },
    {
      ods: 3,
      causeCount: 18,
    },
    {
      ods: 4,
      causeCount: 32,
    },
  ];

  it('should create bar chart config for ODS by cause', () => {
    const chartConfig = createOdsByCauseBar(odsByCauseData);

    expect(chartConfig.type).toBe('bar');
    expect(chartConfig.data.labels).toEqual(['1', '3', '4']);
    expect(chartConfig.data.datasets[0].label).toBe('Número de causas por ODS');
    expect(chartConfig.data.datasets[0].data).toEqual([25, 18, 32]);
    expect(chartConfig.options?.plugins?.legend?.display).toBe(false);
    expect(chartConfig.options?.plugins?.title?.text).toBe('Número de causas por ODS');
    expect(chartConfig._serializedCallbacks?.tooltip?.label).toBe(`(item) => \`Causas: \${item.formattedValue}\``);
  });

  it('should handle empty input array', () => {
    const chartConfig = createOdsByCauseBar([]);

    expect(chartConfig.data.labels).toEqual([]);
    expect(chartConfig.data.datasets[0].data).toEqual([]);
  });
});

describe('createMonthlyJoinsLine', () => {
  const monthlyJoinsData: CommunityLastUsersJoinedSummaryResponseDto[] = [
    {
      communityName: 'Community Alpha',
      dataRange: [
        { month: 'Enero', userCount: 10 },
        { month: 'Febrero', userCount: 15 },
        { month: 'Marzo', userCount: 20 },
      ],
    },
    {
      communityName: 'Community Beta',
      dataRange: [
        { month: 'Enero', userCount: 8 },
        { month: 'Febrero', userCount: 12 },
        { month: 'Marzo', userCount: 18 },
      ],
    },
  ];

  it('should create line chart config for monthly joins', () => {
    const chartConfig = createMonthlyJoinsLine(monthlyJoinsData);

    expect(chartConfig.type).toBe('line');
    expect(chartConfig.data.labels).toEqual(['Enero', 'Febrero', 'Marzo']);
    expect(chartConfig.data.datasets).toHaveLength(2);
    expect(chartConfig.data.datasets[0]).toEqual({
      label: 'Community Alpha',
      data: [10, 15, 20],
      tension: 0.1,
    });
    expect(chartConfig.data.datasets[1]).toEqual({
      label: 'Community Beta',
      data: [8, 12, 18],
      tension: 0.1,
    });
    expect(chartConfig.options?.plugins?.title?.text).toBe('Comparativa de uniones mensuales');
    expect(chartConfig._serializedCallbacks?.tooltip?.label).toBe(
      `(item) => \`Usuarios nuevos: \${item.formattedValue}\``,
    );
  });

  it('should handle empty input array', () => {
    const chartConfig = createMonthlyJoinsLine([]);

    expect(chartConfig.data.labels).toEqual([]);
    expect(chartConfig.data.datasets).toEqual([]);
  });

  it('should handle input with empty dataRange', () => {
    const emptyDataRange: CommunityLastUsersJoinedSummaryResponseDto[] = [
      {
        communityName: 'Community Alpha',
        dataRange: [],
      },
    ];

    const chartConfig = createMonthlyJoinsLine(emptyDataRange);

    expect(chartConfig.data.labels).toEqual([]);
    expect(chartConfig.data.datasets).toEqual([]);
  });
});
