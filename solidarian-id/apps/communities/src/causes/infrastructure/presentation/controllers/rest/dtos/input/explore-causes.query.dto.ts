import { ExploreSortOrder } from '@app/communities/shared/domain/model/enums/explore-sort-order';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

const normalizeOdsValues = ({ value }: { value: unknown }): SustainableDevelopmentGoal[] | undefined => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const rawValues = Array.isArray(value) ? value : [value];
  const normalizedValues = rawValues
    .flatMap(item => String(item).split(','))
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => item.replace(/^ODS_/i, ''))
    .map(item => Number(item));

  return normalizedValues as SustainableDevelopmentGoal[];
};

export class ExploreCausesQueryDto {
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

  @ApiPropertyOptional({
    description:
      'ODS filters. Accepts repeated query params or comma-separated values. Supports numeric values or ODS_n format.',
    enum: SustainableDevelopmentGoal,
    isArray: true,
    example: ['ODS_6', '14'],
  })
  @IsOptional()
  @Transform(normalizeOdsValues)
  @IsEnum(SustainableDevelopmentGoal, { each: true })
  ods?: SustainableDevelopmentGoal[];
}
