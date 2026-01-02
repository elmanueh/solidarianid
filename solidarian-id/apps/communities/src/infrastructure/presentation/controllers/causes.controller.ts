import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CauseDomainMapper } from '../mappers/cause.mapper';
import { CausesService } from '@app/communities/domain/services/causes.service';
import { CauseSummaryResponseDto } from '../dtos/output/cause-summary.response.dto';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { CauseDetailResponseDto } from '../dtos/output/cause-detail.response.dto';

@Controller('causes')
export class CausesController {
  constructor(private readonly causesService: CausesService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all charitable causes' })
  @ApiOkResponse({
    description: 'List of causes',
    type: [CauseSummaryResponseDto],
    isArray: true,
  })
  async getCauses(): Promise<CauseSummaryResponseDto[]> {
    const causes = await this.causesService.getCauses();

    if (causes.isLeft()) {
      throw causes.value;
    }

    return causes.value.map((cause: Cause) => CauseDomainMapper.toCauseSummaryDto(cause));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a charitable cause by ID' })
  @ApiOkResponse({
    description: 'Cause details',
    type: CauseDetailResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Cause not found' })
  async getCauseById(@Param('id', new ParseUUIDPipe()) id: string): Promise<CauseDetailResponseDto> {
    const cause = await this.causesService.getCauseById(id);

    if (cause.isLeft()) {
      throw cause.value;
    }

    return CauseDomainMapper.toCauseDetailDto(cause.value);
  }
}
