export namespace SearchService {
  export const name = 'SEARCH_SERVICE';
  export const port = 49240;

  export namespace Ping {
    export const pattern = 'PING';

    export type Result = string;
  }
}
