import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IdentityUser, UserService } from 'factory';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService.name)
    private readonly client: ClientProxy,
  ) {}

  async getUserInfo(
    token: string,
    payload: Record<string, any>,
  ): Promise<IdentityUser | null> {
    const result = await firstValueFrom(
      this.client.send<
        UserService.GetUserInfo.Result,
        UserService.GetUserInfo.Input
      >('getUserInfo', { token, payload }),
    );

    return result;
  }
}
