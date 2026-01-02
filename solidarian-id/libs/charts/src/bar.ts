import { SerializableChartConfig } from './plugins/callbacks';

interface BarConfigOptions {
  title: string;
  labels: string[];
  values: number[];
  horizontal: boolean;
  legend?: boolean;
  tooltipCallbacks?: Record<string, string>;
}

export function createBarConfig(input: BarConfigOptions): SerializableChartConfig {
  return {
    type: 'bar',
    data: {
      labels: input.labels,
      datasets: [{ label: input.title, data: input.values }],
    },
    options: {
      indexAxis: input.horizontal ? 'y' : 'x',
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        title: { display: true, text: input.title },
        legend: { display: input.legend ? true : false },
      },
    },
    _serializedCallbacks: {
      tooltip: {
        ...input.tooltipCallbacks,
      },
    },
  };
}
