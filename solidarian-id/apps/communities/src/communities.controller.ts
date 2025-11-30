import { Controller, Get } from '@nestjs/common';
import { CommunitiesService } from './communities.service';

@Controller()
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  getHello(): string {
    return this.communitiesService.getHello();
  }
}
