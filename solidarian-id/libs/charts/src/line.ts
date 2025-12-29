import { SerializableChartConfig } from './plugins/plugins';

interface LineConfigInput {
  title: string;
  labels: string[];
  series: { label: string; values: number[] }[];
  tension?: number;
  tooltipCallbacks?: Record<string, string>;
}

export function createLineConfig(
  input: LineConfigInput,
): SerializableChartConfig {
  return {
    type: 'line',
    data: {
      labels: input.labels,
      datasets: input.series.map((s) => ({
        label: s.label,
        data: s.values,
        tension: input.tension ?? 0.3,
      })),
    },
    options: {
      plugins: { title: { display: true, text: input.title } },
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
