import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from 'factory';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(UserService.Ping.pattern)
  ping(): UserService.Ping.Result {
    return 'ping';
  }

  @MessagePattern(UserService.GetUserInfo.pattern)
  getUserInfo(
    data: UserService.GetUserInfo.Input,
  ): Promise<UserService.GetUserInfo.Result> {
    return this.appService.getUserInfo(data.token, data.payload);
  }
}
