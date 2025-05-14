import { defineConfig } from '@mikro-orm/core';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import 'dotenv/config';
import {BidHistory} from "./entities/BidHistory.js";
import {League} from "./entities/League.js";
import { Manager } from './entities/Manager.js';
import {Player} from "./entities/Player.js";
import {Team} from "./entities/Team.js";
import {TransferListedPlayer} from "./entities/TransferListedPlayer.js";

export default defineConfig({
  entities: [
    BidHistory,
    League,
    Manager,
    Player,
    Team,
    TransferListedPlayer,
  ],
  dbName: process.env.DATABASE_NAME || 'jfg',
  driver: PostgreSqlDriver,
  host: 'localhost',
  port: 5432,
  user: 'mikro',
  password: 'mikro',
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  discovery: {
    warnWhenNoEntities: true,
    requireEntitiesArray: true, // Always require explicit entity list
    alwaysAnalyseProperties: false, // Don't analyze properties when not needed
  },
  strict: true,
  validate: true,
  extensions: [EntityGenerator, Migrator],
});
