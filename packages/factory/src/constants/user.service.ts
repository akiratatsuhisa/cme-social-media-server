import { IIdentityUser } from '..';

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
}
