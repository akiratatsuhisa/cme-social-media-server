import { SetMetadata } from '@nestjs/common';
import { Enums } from 'factory';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Array<Enums.Auth0Role>) =>
  SetMetadata(ROLES_KEY, roles);
