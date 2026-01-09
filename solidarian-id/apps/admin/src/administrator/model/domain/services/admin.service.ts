import { DashboardSummary } from '../../data/fakeMetrics';

export abstract class AdminViewService {
  abstract buildDashboardViewModel(): Promise<string>;
  abstract buildDashboardSummaryViewModel(): Promise<{ dataSummary: DashboardSummary }>;
}
