import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { IIdentityUser } from 'factory';
import { Client } from 'pg';
import * as schema from 'src/schema';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  public db: ReturnType<typeof drizzle>;
  private readonly client: Client;

  constructor(configService: ConfigService) {
    this.client = new Client({
      connectionString: configService.get<string>('DATABASE_URL'),
    });
  }

  async onModuleInit() {
    await this.client.connect();
    this.db = drizzle(this.client, { schema, logger: true });
  }

  async onModuleDestroy() {
    await this.client.end();
  }

  createFields(user: IIdentityUser) {
    const date = sql`now()`;

    return {
      createdBy: user.sub,
      createdAt: date,
      updatedBy: user.sub,
      updatedAt: date,
    };
  }

  updatedFields(user: IIdentityUser) {
    const date = sql`now()`;

    return {
      updatedBy: user.sub,
      updatedAt: date,
    };
  }
}
