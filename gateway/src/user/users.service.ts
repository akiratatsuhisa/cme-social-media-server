import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserModels, UserService } from 'factory';
import { firstValueFrom } from 'rxjs';
import { DataLoaderService } from 'src/data-loader/data-loader.service';
import { FilterProps } from 'src/data-loader/data-loader.types';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserService.name) private readonly client: ClientProxy,
    private readonly dataLoaderService: DataLoaderService,
  ) {}

  async loadUserById(id: string) {
    const loader = this.dataLoaderService.get<
      FilterProps,
      string,
      UserModels.IUser
    >({ __key: 'loadUserById' }, async (keys) => {
      const map = await firstValueFrom(
        this.client.send<
          UserService.GetUsersLazy.Result,
          UserService.GetUsersLazy.Input
        >(UserService.GetUsersLazy.pattern, { ids: keys as string[] }),
      );

      return keys.map((key) => map[key]);
    });

    return loader.load(id);
  }
}
