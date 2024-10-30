import { ForbiddenException } from '@nestjs/common';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { Enums } from 'factory';

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

  const userRoles: Array<Enums.Auth0Role> = context.req.user?.roles ?? [];

  if (requiredRoles.some((role) => userRoles.includes(role))) {
    return next();
  }

  throw new ForbiddenException();
};
