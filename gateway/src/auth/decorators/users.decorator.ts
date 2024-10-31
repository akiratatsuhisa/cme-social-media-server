import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IIdentityUser } from 'factory';

export { IIdentityUser };

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: IIdentityUser = ctx.getContext().req.user;

    return data ? user?.[data] : user;
  },
);
