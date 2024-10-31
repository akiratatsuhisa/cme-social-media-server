import { Module } from '@nestjs/common';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UsersService } from './users.service';

@Module({
  providers: [UserResolver, UserService, UsersService],
  exports: [UsersService],
})
export class UserModule {}
