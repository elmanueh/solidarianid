import { SerializableChartConfig } from './plugins/plugins';

interface PieConfigInput {
  title: string;
  labels: string[];
  values: number[];
  tooltipCallbacks?: Record<string, string>;
}

export function createPieConfig(input: PieConfigInput): SerializableChartConfig {
  return {
    type: 'pie',
    data: {
      labels: input.labels,
      datasets: [{ label: input.title, data: input.values }],
    },
    options: {
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
