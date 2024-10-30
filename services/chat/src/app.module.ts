import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MembersModule } from './members/members.module';
import { MessagesModule } from './messages/messages.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [RoomsModule, MembersModule, MessagesModule],
  controllers: [AppController],
})
export class AppModule {}
