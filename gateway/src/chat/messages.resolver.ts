import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ChatModels } from 'factory';
import { User } from 'src/user/types/user.object';
import { UsersService } from 'src/user/users.service';

import { Message } from './types';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly usersSerivce: UsersService) {}

  @ResolveField(() => User)
  async author(@Parent() parent: ChatModels.IMessage) {
    return this.usersSerivce.loadUserById(parent.authorId);
  }

  @ResolveField(() => User)
  async createdUser(@Parent() parent: ChatModels.IMessage) {
    return this.usersSerivce.loadUserById(parent.createdAt);
  }

  @ResolveField(() => User)
  async updatedUser(@Parent() parent: ChatModels.IMessage) {
    return this.usersSerivce.loadUserById(parent.updatedAt);
  }
}
