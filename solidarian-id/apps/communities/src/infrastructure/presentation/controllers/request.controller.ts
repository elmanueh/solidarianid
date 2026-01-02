import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateCommunityRequestDto } from '../dtos/input/create-request-community.request.dto';
import { CreateCauseRequestDto } from '../dtos/input/create-request-cause.request.dto';
import { CreateActionRequestDto } from '../dtos/input/create-request-action.request.dto';
import { RequestsService } from '@app/communities/domain/services/request.service';
import type { Request, Response } from 'express';
import {
  ApiOperation,
  ApiBody,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Requests')
export class RequestController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post('community-requests')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una solicitud de comunidad' })
  @ApiBody({ type: CreateCommunityRequestDto })
  @ApiCreatedResponse({
    description: 'Solicitud de comunidad creada exitosamente',
  })
  @ApiBadRequestResponse({
    description:
      'Datos de entrada inválidos. Errores de validación en nombre, descripción, razón o en las causas asociadas',
  })
  @ApiConflictResponse({
    description:
      'Ya existe una solicitud de comunidad con el mismo nombre o conflicto en la base de datos',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Error interno del servidor. Error en la capa de persistencia o error inesperado',
  })
  async createCommunityRequest(
    @Body() createCommunityRequestDto: CreateCommunityRequestDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const uniqueId = await this.requestsService.createCommunityRequest(
      createCommunityRequestDto,
    );

    if (uniqueId.isLeft()) {
      throw uniqueId.value;
    }

    const locationUrl = `${request.protocol}://${request.get('host')}${request.path}/${uniqueId.value.value}`;

    return response.status(201).location(locationUrl).send();
  }

  @Post('cause-requests')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una solicitud de causa benéfica' })
  @ApiBody({ type: CreateCauseRequestDto })
  @ApiCreatedResponse({
    description: 'Solicitud de causa benéfica creada exitosamente',
  })
  @ApiBadRequestResponse({
    description:
      'Datos de entrada inválidos. Errores de validación en nombre, descripción, ODS, fecha inicial o duración',
  })
  @ApiConflictResponse({
    description:
      'Ya existe una solicitud de causa con el mismo nombre o conflicto en la base de datos',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Error interno del servidor. Error en la capa de persistencia o error inesperado',
  })
  async createCauseRequest(
    @Body() createCauseRequestDto: CreateCauseRequestDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const uniqueId = await this.requestsService.createCauseRequest(
      createCauseRequestDto,
    );

    if (uniqueId.isLeft()) {
      throw uniqueId.value;
    }

    const locationUrl = `${request.protocol}://${request.get('host')}${request.path}/${uniqueId.value.value}`;

    return response.status(201).location(locationUrl).send();
  }

  @Post('action-requests')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una solicitud de acción benéfica' })
  @ApiBody({ type: CreateActionRequestDto })
  @ApiCreatedResponse({
    description: 'Solicitud de acción benéfica creada exitosamente',
  })
  @ApiBadRequestResponse({
    description:
      'Datos de entrada inválidos. Errores de validación en nombre, descripción, objetivos, eventos o lugares',
  })
  @ApiConflictResponse({
    description:
      'Ya existe una solicitud de acción con el mismo nombre o conflicto en la base de datos',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Error interno del servidor. Error en la capa de persistencia o error inesperado',
  })
  async createActionRequest(
    @Body() createActionRequestDto: CreateActionRequestDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const uniqueId = await this.requestsService.createActionRequest(
      createActionRequestDto,
    );

    if (uniqueId.isLeft()) {
      throw uniqueId.value;
    }

    const locationUrl = `${request.protocol}://${request.get('host')}${request.path}/${uniqueId.value.value}`;

    return response.status(201).location(locationUrl).send();
  }
}
