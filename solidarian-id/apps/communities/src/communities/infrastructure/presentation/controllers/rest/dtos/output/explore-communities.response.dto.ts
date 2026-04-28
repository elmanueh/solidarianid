import { ApiProperty } from '@nestjs/swagger';
import { ExploreCommunityItemResponseDto } from './explore-community-item.response.dto';

export class ExploreCommunitiesResponseDto {
  @ApiProperty({ type: [ExploreCommunityItemResponseDto] })
  items: ExploreCommunityItemResponseDto[];

  @ApiProperty({ example: 24 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty({ example: 3 })
  totalPages: number;
}
