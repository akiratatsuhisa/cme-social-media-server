import { Field, InterfaceType } from '@nestjs/graphql';
import { User } from 'src/user/types';

import { ISODateTimeScalar } from '../scalars';

@InterfaceType()
export abstract class BaseNode {
  @Field(() => String)
  createdBy: string;

  @Field(() => ISODateTimeScalar)
  createdAt: string;

  @Field(() => User)
  createdUser: User;

  @Field(() => String)
  updatedBy: string;

  @Field(() => ISODateTimeScalar)
  updatedAt: string;

  @Field(() => User)
  updatedUser: User;
}
