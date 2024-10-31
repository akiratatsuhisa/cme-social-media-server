import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Enums } from 'factory';
import { IncomingMessage } from 'http';

import { IIdentityUser, IS_PUBLIC_KEY, ROLES_KEY } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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

  canActivate(context: ExecutionContext): boolean {
    const { user } = this.getRequest(context) as IncomingMessage & {
      user: IIdentityUser | null;
    };

    const isPublic =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false;

    if (isPublic && !user) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<
      Array<Enums.Auth0Role>
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    if (requiredRoles.some((role) => user.roles?.includes(role))) {
      return true;
    }

    throw new ForbiddenException();
  }
}
