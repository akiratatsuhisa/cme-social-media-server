import { Enums } from './';

export class IdentityUser {
  public sub: string;
  public nickname: string;
  public name: string;
  public picture: string;
  public updatedAt: string;
  public email: string;
  public emailVerified: boolean;
  public userMetadata: Record<string, any>;
  public appMetadata: Record<string, any>;
  public roles: Array<Enums.Auth0Role>;

  constructor(payload?: Record<string, any>) {
    this.sub = payload?.sub;
    this.nickname = payload?.nickname;
    this.name = payload?.name;
    this.picture = payload?.picture;
    this.updatedAt = payload?.updated_at ?? payload?.updatedAt;
    this.email = payload?.email;
    this.emailVerified = payload?.email_verified ?? payload?.emailVerified;
    this.userMetadata = payload?.user_metadata ?? payload?.userMetadata;
    this.appMetadata = payload?.app_metadata ?? payload?.appMetadata;
    this.roles = payload?.user_roles ?? payload?.roles;
  }
}
