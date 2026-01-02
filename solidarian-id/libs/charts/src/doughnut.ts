import { SerializableChartConfig } from './plugins/plugins';

interface DoughnutConfigInput {
  title: string;
  labels: string[];
  values: number[];
  cutout?: string;
  tooltipCallbacks?: Record<string, string>;
}

export function createDoughnutConfig(input: DoughnutConfigInput): SerializableChartConfig {
  return {
    type: 'doughnut',
    data: {
      labels: input.labels,
      datasets: [{ label: input.title, data: input.values }],
    },
    options: {
      cutout: input.cutout ?? '60%',
      plugins: { title: { display: true, text: input.title } },
      animation: true,
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
    },
    _serializedCallbacks: {
      tooltip: {
        ...input.tooltipCallbacks,
      },
    },
  };
}
