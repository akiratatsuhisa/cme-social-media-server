import { HttpService } from '@nestjs/axios';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import dayjs from 'dayjs';
import { Enums, IIdentityUser } from 'factory';

class IdentityUser implements IIdentityUser {
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

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private cachePrefix = 'AUTH0_USER_INFO';

  async getUserInfo(
    token: string,
    payload: Record<string, any>,
  ): Promise<IIdentityUser> {
    const key = `${this.cachePrefix}:${payload.sub}`;
    const cache = await this.cacheManager.get<string>(key);

    if (cache) {
      return new IdentityUser(JSON.parse(cache));
    }

    try {
      const response = await this.httpService.axiosRef.get(
        `${this.configService.get<string>('OAUTH_DOMAIN')}/userinfo`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      const result = new IdentityUser(Object.assign(payload, response.data));

      await this.cacheManager.set(
        key,
        JSON.stringify(result),
        dayjs(payload.exp * 1000).diff(),
      );

      return result;
    } catch {
      return null;
    }
  }

  async getUserInfoOrThrow(sub: string): Promise<IIdentityUser> {
    const key = `${this.cachePrefix}:${sub}`;
    const cache = await this.cacheManager.get<string>(key);

    if (!cache) {
      throw new RpcException({
        status: 'error',
        message: 'Notfound credentials.',
      });
    }

    return new IdentityUser(JSON.parse(cache));
  }
}
