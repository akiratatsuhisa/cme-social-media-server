import { IIdentityUser, UserModels } from '..';

export namespace UserService {
  export const name = 'USER_SERVICE';
  export const port = 49210;

  export namespace Ping {
    export const pattern = 'PING';

    export type Result = string;
  }

  export namespace GetUserInfo {
    export const pattern = 'GET_USER_INFO';

    export type Input = {
      token: string;
      payload: Record<string, any>;
    };

    export type Result = IIdentityUser;
  }

  export namespace GetUsersLazy {
    export const pattern = 'GET_USERS_LAZY';

    export type Input = {
      ids?: Array<string>;
    };

    export type Result = Record<string, UserModels.IUser>;
  }
}
