import { EventSummaryResponseDto } from './event-summary.response.dto';
import { ObjetiveSummaryResponseDto } from './objetive-summary.response.dto';

export class ActionDetailResponseDto {
  id: string;
  name: string;
  description: string;
  events: EventSummaryResponseDto[];
  objectives: ObjetiveSummaryResponseDto[];
}
