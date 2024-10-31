import { Field, ObjectType } from '@nestjs/graphql';
import { UserModels } from 'factory';

@ObjectType()
export class User implements UserModels.IUser {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String)
  picture: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  nickname: string;

  @Field(() => String, { nullable: true })
  givenName: string;

  @Field(() => String, { nullable: true })
  familyName: string;
}
