import { UpdateStatusRequestDto } from '@app/admin/administrator/model/application/dtos/update-status.request.dto';
import { RequestsServicePort } from '@app/admin/administrator/model/domain/interfaces/requests.service.port';
import { Controller, Patch, Param, Body } from '@nestjs/common';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsServicePort) {}

  @Patch(':id')
  async changeStatus(
    @Param('id') id: string,
    @Body() body: UpdateStatusRequestDto,
  ) {
    const { status, reason } = body;
    const res = await this.requestsService.updateStatus(id, status, reason);
    if (res.isLeft()) throw res.value;
  }
}
