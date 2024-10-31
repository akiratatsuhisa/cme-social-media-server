import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';

import { PUB_SUB } from './constants';

const pubSubProvider: Provider = {
  provide: PUB_SUB,
  useFactory: (configService: ConfigService) => {
    const options: RedisOptions = {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
      retryStrategy: (times) => {
        return Math.min(times * 50, 1000);
      },
    };

    const pubSub = new RedisPubSub({
      publisher: new Redis(options),
      subscriber: new Redis(options),
    });

    return pubSub;
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [pubSubProvider],
  exports: [pubSubProvider],
})
export class GraphModule {}
