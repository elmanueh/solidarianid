import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunitiesService {
  getHello(): string {
    return 'Hello World!';
  }
}
