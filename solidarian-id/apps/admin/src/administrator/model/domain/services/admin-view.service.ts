import { DashboardSummary } from '../../application/services/data/dashboardSummary.data';

export abstract class AdminViewService {
  abstract buildDashboardViewModel(): Promise<string>;
  abstract buildDashboardSummaryViewModel(): Promise<DashboardSummary>;
}
