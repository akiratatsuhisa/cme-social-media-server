export namespace ChatModels {
  export interface IRoom {
    id: string;
    name: string;
    isGroup: boolean;

    photoUrl: string;
    coverUrl: string;
    themeSource: number;
    themeStyle: string;

    lastActivatedAt: string;

    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
  }

  export enum MemberRoles {
    Administrator = 'administrator',
    Moderator = 'moderator',
    Member = 'member',
    None = 'none',
  }

  export interface IMember {
    id: string;

    roomId: string;
    memberId: string;

    nickName: string;
    role: MemberRoles;

    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
  }

  export enum MessageTypes {
    Link = 'link',
    Text = 'text',
    Icons = 'icons',
    Images = 'images',
    Files = 'files',
    Audios = 'audios',
    Videos = 'videos',
    None = 'none',
  }

  export interface IMessage {
    id: string;

    roomId: string;
    authorId: string;

    type: MessageTypes;
    mediaCount: number;

    content: unknown;

    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
  }
}
