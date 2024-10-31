import { Enums } from './';

export interface IIdentityUser {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updatedAt: string;
  email: string;
  emailVerified: boolean;
  userMetadata: Record<string, any>;
  appMetadata: Record<string, any>;
  roles: Array<Enums.Auth0Role>;
}
