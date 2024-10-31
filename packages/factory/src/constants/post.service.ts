export namespace PostService {
  export const name = 'POST_SERVICE';
  export const port = 49230;

  export namespace Ping {
    export const pattern = 'PING';

    export type Result = string;
  }
}
