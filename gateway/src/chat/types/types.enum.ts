import { registerEnumType } from '@nestjs/graphql';
import { ChatModels } from 'factory';

registerEnumType(ChatModels.MemberRoles, {
  name: 'MemberRole',
  description: 'Determine user permissions in the room',
});

registerEnumType(ChatModels.MessageTypes, {
  name: 'MessageType',
  description: 'Determine the type of message in the room',
});
