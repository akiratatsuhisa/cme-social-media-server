import { Inject, Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { UserModels } from 'factory';
import _ from 'lodash';
import { LIMIT, MANAGEMENT } from 'src/auth0/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MANAGEMENT) private readonly management: ManagementClient,
  ) {}

  async getUsersLazy(ids: Array<string>) {
    const chunkResult = await Promise.all(
      _.chunk(_.uniq(ids), LIMIT).map(async (userIds) => {
        const res = await this.management.users.getAll({
          q: `user_id: ${userIds.map((id) => `"${id}"`).join(' ')}`,
          per_page: LIMIT,
          fields:
            'user_id,username,picture,name,nickname,given_name,family_name',
          include_fields: true,
        });

        return res.data;
      }),
    );

    const mapUsers = _.reduce(
      chunkResult,
      (map, result) => {
        _.forEach(result, (pointer) => {
          map[pointer.user_id] = {
            id: pointer.user_id,
            username: pointer.username,
            picture: pointer.picture,
            name: pointer.name,
            nickname: pointer.nickname,
            givenName: pointer.given_name,
            familyName: pointer.family_name,
          };
        });
        return map;
      },
      {} as Record<string, UserModels.IUser>,
    );

    return mapUsers;
  }
}
