import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, GrpcOptions, Transport } from '@nestjs/microservices';
import {
  ChatService,
  MaterialYouService,
  NotificationService,
  PostService,
  SearchService,
  UserService,
} from 'factory';
import { join } from 'path';

import { AppController } from './app.controller';
import { appProviders } from './app.providers';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MATERIAL_PACKAGE_NAME } from './proto/material';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register({
      isGlobal: true,
      clients: [
        {
          name: UserService.name,
          transport: Transport.TCP,
          options: { port: UserService.port },
        },
        {
          name: ChatService.name,
          transport: Transport.TCP,
          options: { port: ChatService.port },
        },
        {
          name: PostService.name,
          transport: Transport.TCP,
          options: { port: PostService.port },
        },
        {
          name: SearchService.name,
          transport: Transport.TCP,
          options: { port: SearchService.port },
        },
        {
          name: NotificationService.name,
          transport: Transport.TCP,
          options: { port: NotificationService.port },
        },
        {
          /**
           * https://github.com/grpc/grpc-node/blob/master/packages/proto-loader/README.md
           * To configure the response type of the data, pay attention to the `loader` options
           */
          name: MaterialYouService.name,
          transport: Transport.GRPC,
          options: {
            url: `0.0.0.0:${MaterialYouService.port}`,
            package: MATERIAL_PACKAGE_NAME,
            protoPath: join(
              __dirname,
              '../../..',
              'cme-material-you-service',
              'src/proto/material.proto',
            ),
            loader: { longs: Number },
          } as GrpcOptions['options'],
        },
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [...appProviders, AppService, AppResolver],
})
export class AppModule {}
