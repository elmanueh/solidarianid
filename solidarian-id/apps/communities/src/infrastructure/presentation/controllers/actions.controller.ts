import { ActionsService } from '@app/communities/domain/services/actions.service';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ActionSummaryResponseDto } from '../dtos/output/action-summary.response.dto';
import { ActionDomainMapper } from '../mappers/action.mapper';
import { Action } from '@app/communities/domain/model/entities/action';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ActionDetailResponseDto } from '../dtos/output/action-detail.response.dto';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all charitable actions' })
  @ApiOkResponse({
    description: 'List of actions',
    type: [ActionSummaryResponseDto],
    isArray: true,
  })
  async getActions(): Promise<ActionSummaryResponseDto[]> {
    const actions = await this.actionsService.getActions();

    if (actions.isLeft()) {
      throw actions.value;
    }

    return actions.value.map((action: Action) => ActionDomainMapper.toActionSummaryDto(action));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a charitable action by ID' })
  @ApiOkResponse({
    description: 'Action details',
    type: ActionDetailResponseDto,
  })
  async getActionById(@Param('id', new ParseUUIDPipe()) id: string): Promise<ActionDetailResponseDto> {
    const action = await this.actionsService.getActionById(id);

    if (action.isLeft()) {
      throw action.value;
    }

    return ActionDomainMapper.toActionDetailDto(action.value);
  }
}
