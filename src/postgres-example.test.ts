import { Entity, MikroORM, PrimaryKey, Property } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from './mikro-orm.config';
import {TransferListedPlayer} from "./entities/TransferListedPlayer.js";

@Entity()
class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

let orm: MikroORM<PostgreSqlDriver>;

beforeAll(async () => {
  orm = await MikroORM.init<PostgreSqlDriver>(config);
});

afterAll(async () => {
  await orm.close(true);
});

// Add your reproduction test case here
test('get transfer listed players', async () => {
  const em = orm.em.fork();
  const players = await em.find(
      TransferListedPlayer,
      {
        auctionEndTime: { $lt: Date.now() },
      },
      {
        populate: [
          'player',
          'player.team',
          'player.team.manager',
          'bidHistory',
          'bidHistory.team',
        ],
      }
  );
  expect(players.length).toBe(10);
    expect(players[0].player.playerId).not.toEqual(players[1].player.playerId);
});
