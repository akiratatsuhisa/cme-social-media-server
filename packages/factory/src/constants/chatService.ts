export namespace ChatService {
  export const name = 'CHAT_SERVICE';
  export const port = 49220;

  export namespace Ping {
    export const pattern = 'PING';

    export type Result = string;
  }
}
