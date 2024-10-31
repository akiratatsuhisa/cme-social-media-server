import { Field, ObjectType } from '@nestjs/graphql';
import { ChatModels } from 'factory';
import { BaseNode } from 'src/graphql/models';

import { Room } from './room.object';

@ObjectType({ implements: () => [BaseNode] })
export class Member implements BaseNode, ChatModels.IMember {
  @Field(() => String)
  id: string;

  @Field(() => String)
  roomId: string;

  @Field(() => Room)
  room: Room;

  @Field(() => String)
  memberId: string;

  // @Field(() => User)
  // member: User;

  @Field(() => String, { nullable: true })
  nickName: string;

  @Field(() => ChatModels.MemberRoles)
  role: ChatModels.MemberRoles;

  createdBy: string;

  // createdUser: User;

  createdAt: string;

  updatedBy: string;

  // updatedUser: User;

  updatedAt: string;
}
