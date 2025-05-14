import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Player } from './entities/Player.js';
import { Team } from './entities/Team.js';
import { BidHistory } from './entities/BidHistory.js';
import { TransferListedPlayer } from './entities/TransferListedPlayer.js';
import { League } from './entities/League.js';
import { Manager } from './entities/Manager.js';


async function init() {
  console.log('Connecting to PostgreSQL database...');

  const orm = await MikroORM.init<PostgreSqlDriver>({
    driver: 'postgresql',
    dbName: 'mikro_test',
    user: 'mikro',
    password: 'mikro',
    host: 'localhost',
    port: 5432,
    entities: [
      Player,
      Team,
      BidHistory,
      TransferListedPlayer,
      League,
      Manager,
    ],
    debug: ['query', 'query-params'],
    allowGlobalContext: true,
  });

  console.log('Connected to PostgreSQL database');

  try {
    console.log('Dropping database schema...');
    await orm.schema.dropSchema();
    console.log('Creating database schema...');
    await orm.schema.createSchema();
    console.log('Schema created successfully');
  } catch (error) {
    console.error('Error creating schema:', error);
  }

  await orm.close(true);
  console.log('Database connection closed');
}

init().catch(err => console.error('Error:', err));
