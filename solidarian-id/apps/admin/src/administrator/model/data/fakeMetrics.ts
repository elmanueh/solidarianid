enum ODS {
  ODS_1 = 1,
  ODS_2,
  ODS_3,
  ODS_4,
  ODS_5,
  ODS_6,
  ODS_7,
  ODS_8,
  ODS_9,
  ODS_10,
  ODS_11,
  ODS_12,
  ODS_13,
  ODS_14,
  ODS_15,
  ODS_16,
  ODS_17,
}

export interface DashboardSummary {
  totalUsers: number;
  totalComunities: number;
  totalCauses: number;
  totalActions: number;
}

export interface DashboardChart {
  // Pie
  odsByCause: [ods: ODS, count: number][];

  // Doughnut
  interactiveNationalities: [nation: string, count: number][];

  // Bar
  topCommunitiesByUsers: [communityName: string, users: number][];

  // Line
  monthlyJoinsForCommunity: {
    months: string[];
    series: {
      label: string;
      data: number[];
    }[];
  };
}

export const fakeDashboardSummary: DashboardSummary = {
  totalUsers: 1250,
  totalComunities: 85,
  totalCauses: 340,
  totalActions: 1200,
};

export const fakeDashboardData: DashboardChart = {
  odsByCause: [
    [ODS.ODS_1, 50],
    [ODS.ODS_2, 30],
    [ODS.ODS_3, 40],
    [ODS.ODS_4, 25],
    [ODS.ODS_5, 20],
    [ODS.ODS_6, 15],
    [ODS.ODS_7, 10],
    [ODS.ODS_8, 35],
    [ODS.ODS_9, 18],
    [ODS.ODS_10, 22],
    [ODS.ODS_11, 28],
    [ODS.ODS_12, 12],
    [ODS.ODS_13, 45],
    [ODS.ODS_14, 8],
    [ODS.ODS_15, 14],
    [ODS.ODS_16, 19],
    [ODS.ODS_17, 27],
  ],

  interactiveNationalities: [
    ['Spain', 400],
    ['Mexico', 250],
    ['Argentina', 150],
    ['Colombia', 120],
    ['Peru', 100],
    ['Chile', 80],
    ['Ecuador', 70],
    ['Other', 80],
  ],

  topCommunitiesByUsers: [
    ['Salvemos africa', 300],
    ['NotreDawn', 250],
    ['Salvemos marruecos', 200],
    ['Ecuador', 150],
    ['Penes sin fronteras', 100],
  ],

  monthlyJoinsForCommunity: {
    months: [
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
      'January',
    ],
    series: [
      {
        label: 'Salvemos africa',
        data: [20, 25, 40, 45, 55, 45, 35, 55, 40, 65, 70, 75],
      },
      {
        label: 'NotreDawn',
        data: [15, 20, 30, 35, 40, 30, 25, 40, 30, 45, 50, 55],
      },
      {
        label: 'Penes sin fronteras',
        data: [10, 15, 20, 25, 30, 20, 15, 25, 20, 30, 35, 40],
      },
    ],
  },
};
