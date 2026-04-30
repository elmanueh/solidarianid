import { ActionDetailResponseDto } from '@app/communities/actions/infrastructure/presentation/controllers/rest/dtos/output/action-detail.response.dto';
import { ActionSummaryResponseDto } from '@app/communities/actions/infrastructure/presentation/controllers/rest/dtos/output/action-summary.response.dto';
import { ActionDomainMapper } from '@app/communities/actions/infrastructure/presentation/controllers/rest/mappers/action.mapper';
import { Action } from '@app/communities/shared/domain/model/aggregates/action';
import { ActionsService } from '@app/communities/shared/domain/services/actions.service';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  /** @deprecated Usa GraphQL en su lugar. */
  @Get('actions')
  @ApiOperation({ summary: 'Retrieve all charitable actions', deprecated: true })
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

  /** @deprecated Usa GraphQL en su lugar. */
  @Get('actions/:id')
  @ApiOperation({ summary: 'Retrieve a charitable action by ID', deprecated: true })
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
