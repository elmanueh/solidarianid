import { createBarConfig } from '@charts/bar';
import { createDoughnutConfig } from '@charts/doughnut';
import { createLineConfig } from '@charts/line';
import { createPieConfig } from '@charts/pie';
import { ChartConfiguration } from 'chart.js';
import { monthNames, odsNames } from './data-utils';
import { Serializable } from 'child_process';
import { SerializableChartConfig } from '@charts/plugins/plugins';

export function createTopCommunitiesPie(
  topCommunitiesByUser: Array<[communityName: string, count: number]>,
): SerializableChartConfig {
  const labels = topCommunitiesByUser.map(([communityName]) => communityName);
  const values = topCommunitiesByUser.map(([, count]) => count);

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
  nationalitiesData: Array<[nationality: string, count: number]>,
): SerializableChartConfig {
  const labels = nationalitiesData.map(([nationality]) => nationality);
  const values = nationalitiesData.map(([, count]) => count);

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

export function createOdsByCauseBar(
  odsByCauseData: Array<[ods: number, count: number]>,
): SerializableChartConfig {
  const labels = odsByCauseData.map(([ods]) => ods.toString());
  const values = odsByCauseData.map(([, count]) => count);

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

export function createMonthlyJoinsLine(
  monthlyJoinsData: { label: string; data: number[] }[],
): SerializableChartConfig {
  return createLineConfig({
    title: 'Comparativa de uniones mensuales',
    labels: monthNames,
    series: monthlyJoinsData.map((c) => ({
      label: c.label,
      values: c.data,
    })),
    tension: 0.1,
    tooltipCallbacks: {
      label: `(item) => \`Usuarios nuevos: \${item.formattedValue}\``,
    },
  });
}
