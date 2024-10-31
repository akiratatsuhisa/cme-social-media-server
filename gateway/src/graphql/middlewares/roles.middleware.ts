import { ForbiddenException } from '@nestjs/common';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { Enums } from 'factory';
import { IncomingMessage } from 'http';

/**
 * By using decortor Extensions({roles: ["Administrator", "U"] })
 * @param {MiddlewareContext} ctx
 * @param {NextFn} next
 * @returns
 */
export const roleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const { info, context } = ctx;
  const { extensions } = info.parentType.getFields()[info.fieldName];

  const requiredRoles: Array<Enums.Auth0Role> =
    (extensions.roles as Array<Enums.Auth0Role>) ?? [];

  if (!requiredRoles.length) {
    return next();
  }

  const request =
    context.req instanceof IncomingMessage
      ? context.req
      : context.req.extra.request;

  const userRoles: Array<Enums.Auth0Role> = request.user?.roles ?? [];

  if (requiredRoles.some((role) => userRoles.includes(role))) {
    return next();
  }

  throw new ForbiddenException();
};
