import { Field, ObjectType } from '@nestjs/graphql';
import { ChatModels } from 'factory';
import { BaseNode } from 'src/graphql/models';
import { User } from 'src/user/types';

import { Room } from './room.object';

@ObjectType({ implements: () => [BaseNode] })
export class Message implements BaseNode, ChatModels.IMessage {
  @Field(() => String)
  id: string;

  @Field(() => String)
  roomId: string;

  @Field(() => Room)
  room: Room;

  @Field(() => String)
  authorId: string;

  @Field(() => User)
  author: User;

  @Field(() => ChatModels.MessageTypes)
  type: ChatModels.MessageTypes;

  @Field(() => Number, { nullable: true })
  mediaCount: number;

  @Field(() => String, { nullable: true })
  content: unknown;

  createdBy: string;

  createdUser: User;

  createdAt: string;

  updatedBy: string;

  updatedUser: User;

  updatedAt: string;
}
