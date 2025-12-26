/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChartConfiguration } from 'chart.js';

export interface SerializableChartConfig extends ChartConfiguration<
  'bar' | 'doughnut' | 'line' | 'pie',
  number[],
  string
> {
  _serializedCallbacks?: {
    tooltip?: Record<string, string>;
  };
}

export function hydrateCallbacks(
  config: SerializableChartConfig,
): ChartConfiguration<'bar' | 'doughnut' | 'line' | 'pie', number[], string> {
  config.options = config.options || {};
  config.options.plugins = config.options.plugins || {};
  config.options.plugins.tooltip = config.options.plugins.tooltip || {};
  config.options.plugins.tooltip.callbacks = {};

  for (const [key, funcString] of Object.entries(
    config._serializedCallbacks?.tooltip || {},
  )) {
    (config.options.plugins.tooltip.callbacks as Record<string, any>)[key] =
      new Function('return ' + funcString)();
  }

  delete config._serializedCallbacks;
  return config;
}
