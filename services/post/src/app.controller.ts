import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from 'factory';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern(PostService.Ping.pattern)
  ping(): PostService.Ping.Result {
    return 'ping';
  }
}
