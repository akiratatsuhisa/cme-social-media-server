import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IncomingMessage } from 'http';

import { IIdentityUser, IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class JwksAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext): IncomingMessage {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (req instanceof IncomingMessage) {
      return req;
    }
    const request: IncomingMessage = req.extra.request;

    request.headers.authorization = req.connectionParams.Authorization;
    return request;
  }

  handleRequest(
    err: unknown,
    user: IIdentityUser,
    _info: unknown,
    context: ExecutionContext,
  ) {
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false;

    if (isPublic && !user) {
      return null;
    }

    if (err || !user) {
      throw new UnauthorizedException();
    }

    return user as any;
  }
}
