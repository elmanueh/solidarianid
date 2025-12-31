import { ActionSummaryResponseDto } from './action-summary.response.dto';

export class CauseDetailResponseDto {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  ods: number[];
  actions: ActionSummaryResponseDto[];
}
