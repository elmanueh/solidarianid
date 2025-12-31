import { CauseSummaryResponseDto } from './cause-summary.response.dto';

export class CommunityDetailResponseDto {
  id: string;
  name: string;
  description: string;
  causes: CauseSummaryResponseDto[];
}
