import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { MessagesResolver } from './messages.resolver';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [ChatService, ChatResolver, MessagesResolver],
})
export class ChatModule {}
