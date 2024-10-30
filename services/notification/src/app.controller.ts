import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from 'factory';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern(NotificationService.Ping.pattern)
  ping(): NotificationService.Ping.Result {
    return 'ping';
  }
}
