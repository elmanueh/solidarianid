import { ApiProperty } from '@nestjs/swagger';
import { ExploreCauseItemResponseDto } from './explore-cause-item.response.dto';

export class ExploreCausesResponseDto {
  @ApiProperty({ type: [ExploreCauseItemResponseDto] })
  items: ExploreCauseItemResponseDto[];

  @ApiProperty({ example: 24 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty({ example: 3 })
  totalPages: number;
}
