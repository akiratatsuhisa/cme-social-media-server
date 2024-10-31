import {
  bigint,
  boolean,
  index,
  json,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { DatabaseConstants } from 'factory';

const { StringLength } = DatabaseConstants;

const commonFields = {
  createdBy: varchar('created_by', {
    length: StringLength.default,
  }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedBy: varchar('updated_by', {
    length: StringLength.default,
  }).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
};

export const rooms = pgTable(
  'rooms',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: StringLength.default }),
    isGroup: boolean('is_group').notNull().default(false),

    photoUrl: varchar('photo_url', { length: StringLength.large }),
    coverUrl: varchar('cover_url', { length: StringLength.large }),
    themeSource: bigint('theme_source', { mode: 'number' }),
    themeStyle: text('theme_style'),

    lastActivatedAt: timestamp('last_activated_at', { mode: 'string' }),

    ...commonFields,
  },
  (table) => {
    return {
      lastActivatedAtIndex: index('last_activated_at_index').on(
        table.lastActivatedAt.desc().nullsLast(),
      ),
    };
  },
);

export const memberRolesEnum = pgEnum('member_roles', [
  'administrator',
  'moderator',
  'member',
  'none',
]);

export const members = pgTable(
  'members',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    roomId: uuid('room_id')
      .notNull()
      .references(() => rooms.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    memberId: varchar('member_id', { length: StringLength.default }).notNull(),

    nickName: varchar('nick_name', { length: StringLength.default }),
    role: memberRolesEnum('role').notNull().default('member'),

    ...commonFields,
  },
  (table) => {
    return {
      memberPerRoomUnique: unique('member_per_room_unique').on(
        table.roomId,
        table.memberId,
      ),
    };
  },
);

export const messageTypesEnum = pgEnum('message_types', [
  'text',
  'link',
  'icons',
  'images',
  'files',
  'audios',
  'videos',
  'none',
]);

export const messages = pgTable(
  'messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    roomId: uuid('room_id')
      .notNull()
      .references(() => rooms.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    authorId: varchar('author_id', { length: StringLength.default }).notNull(),

    type: messageTypesEnum('type').notNull().default('text'),
    mediaCount: smallint('media_count'),
    content: json('content').notNull().default(null),

    ...commonFields,
  },
  (table) => {
    return {
      createdAtByRoomIdIndex: index('created_at_by_room_id_index').on(
        table.roomId,
        table.createdAt.desc(),
      ),
    };
  },
);
