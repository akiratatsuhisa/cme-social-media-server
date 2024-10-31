import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from 'factory';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UserService.GetUsersLazy.pattern)
  async getUsersLazy(input: UserService.GetUsersLazy.Input) {
    return this.usersService.getUsersLazy(input.ids);
  }
}
