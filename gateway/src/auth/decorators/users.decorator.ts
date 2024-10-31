import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IIdentityUser } from 'factory';
import { IncomingMessage } from 'http';

export { IIdentityUser };

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req;

    const request = req instanceof IncomingMessage ? req : req.extra.request;

    const user: IIdentityUser = request.user;

    return data ? user?.[data] : user;
  },
);
