export namespace NotificationService {
  export const name = 'NOTIFICATION_SERVICE';
  export const port = 49250;

  export namespace Ping {
    export const pattern = 'PING';

    export type Result = string;
  }
}
