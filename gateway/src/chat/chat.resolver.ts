import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/graphql/constants';

import { Message } from './types';

const generateIdFn = function* () {
  let i = 1;
  while (true) {
    yield i++;
  }
};

const generateId = generateIdFn();

@Resolver()
export class ChatResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub) {}

  @Subscription(() => Message)
  messageChanged(@Args('roomId') roomId: string) {
    return this.pubSub.asyncIterator(`TEST_${roomId}`);
  }

  @Mutation(() => Message)
  addMessage() {
    const message = new Message();
    message.id = generateId.next().value.toString();
    message.roomId = '1';
    message.authorId = '1';

    this.pubSub.publish(`TEST_${message.roomId}`, { messageChanged: message });

    return message;
  }
}
