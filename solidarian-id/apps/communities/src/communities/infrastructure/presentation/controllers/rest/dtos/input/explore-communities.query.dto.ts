import { ExploreSortOrder } from '@app/communities/shared/domain/model/enums/explore-sort-order';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ExploreCommunitiesQueryDto {
  @ApiPropertyOptional({
    description: 'Page number starting from 1',
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  @ApiPropertyOptional({
    description: 'Case-insensitive search applied to name',
    example: 'water',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Sorting direction. Sorting field is fixed to name',
    enum: ExploreSortOrder,
    example: ExploreSortOrder.ASC,
    default: ExploreSortOrder.ASC,
  })
  @IsOptional()
  @IsEnum(ExploreSortOrder)
  sortOrder: ExploreSortOrder = ExploreSortOrder.ASC;
}
