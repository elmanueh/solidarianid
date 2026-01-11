import { ApiProperty } from '@nestjs/swagger';

export class ObjetiveSummaryResponseDto {
  @ApiProperty({
    description: 'Objective name',
    example: 'Collect Food Items',
  })
  name: string;

  @ApiProperty({
    description: 'Objective description',
    example: 'Collect non-perishable food items for distribution',
  })
  description: string;

  @ApiProperty({
    description: 'Unit of measurement',
    example: 'kg',
  })
  unit: string;

  @ApiProperty({
    description: 'Target quantity to achieve',
    example: 1000,
  })
  quantity: number;

  @ApiProperty({
    description: 'Current amount achieved',
    example: 750,
  })
  currentAmount: number;
}
