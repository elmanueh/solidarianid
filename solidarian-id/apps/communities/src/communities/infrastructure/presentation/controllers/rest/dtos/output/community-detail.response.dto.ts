import { CauseSummaryResponseDto } from '@app/communities/causes/infrastructure/presentation/controllers/rest/dtos/output/cause-summary.response.dto';

export class CommunityDetailResponseDto {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  causes: CauseSummaryResponseDto[];
}
