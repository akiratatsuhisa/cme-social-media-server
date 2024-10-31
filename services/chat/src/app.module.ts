import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { DrizzleModule } from './drizzle/drizzle.module';
import { MembersModule } from './members/members.module';
import { MessagesModule } from './messages/messages.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    RoomsModule,
    MembersModule,
    MessagesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
