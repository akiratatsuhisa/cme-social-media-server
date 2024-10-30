import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from 'factory';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern(ChatService.Ping.pattern)
  ping(): ChatService.Ping.Result {
    return 'ping';
  }
}
