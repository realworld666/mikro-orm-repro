import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Player } from './entities/Player';
import { Team } from './entities/Team';
import { BidHistory } from './entities/BidHistory';
import { TransferListedPlayer } from './entities/TransferListedPlayer';

// Create stub entities for the missing ones referenced in the existing entities
// These are placeholders to make the schema generation work
class PlayerAttributes {
  id!: string;
  player!: any;
}

class PlayerMatchHistory {
  id!: string;
  player!: any;
}

class PlayerOverallStats {
  id!: string;
  player!: any;
}

class League {
  id!: string;
}

class Manager {
  id!: string;
  team!: any;
}

async function init() {
  console.log('Connecting to PostgreSQL database...');
  
  const orm = await MikroORM.init<PostgreSqlDriver>({
    type: 'postgresql',
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
      // Add stub entities to make the schema generation work
      PlayerAttributes,
      PlayerMatchHistory,
      PlayerOverallStats,
      League,
      Manager
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
