import { Field, ObjectType } from '@nestjs/graphql';
import { ChatModels } from 'factory';
import { BaseNode } from 'src/graphql/models';
import { ISODateTimeScalar } from 'src/graphql/scalars';
import { User } from 'src/user/types';

@ObjectType({ implements: () => [BaseNode] })
export class Room implements BaseNode, ChatModels.IRoom {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isGroup: boolean;

  @Field(() => String, { nullable: true })
  photoUrl: string;

  @Field(() => String, { nullable: true })
  coverUrl: string;

  @Field(() => Number, { nullable: true })
  themeSource: number;

  @Field(() => String, { nullable: true })
  themeStyle: string;

  @Field(() => ISODateTimeScalar, { nullable: true })
  lastActivatedAt: string;

  createdBy: string;

  createdUser: User;

  createdAt: string;

  updatedBy: string;

  updatedUser: User;

  updatedAt: string;
}
