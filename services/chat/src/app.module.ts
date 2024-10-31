import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DrizzleModule } from './drizzle/drizzle.module';
import { MembersModule } from './members/members.module';
import { MessagesModule } from './messages/messages.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [DrizzleModule, RoomsModule, MembersModule, MessagesModule],
  controllers: [AppController],
})
export class AppModule {}
