import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SearchService } from 'factory';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern(SearchService.Ping.pattern)
  ping(): SearchService.Ping.Result {
    return 'ping';
  }
}
