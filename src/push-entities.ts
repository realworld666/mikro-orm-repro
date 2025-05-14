import config from './mikro-orm.config.js';
import {MikroORM} from '@mikro-orm/core';
import {PlayerFactory} from './factories/playerFactory.js';
import {TeamsFactory} from "./factories/teamFactory.js";
import {LeagueFactory} from "./factories/leagueFactory.js";
import {League} from "./entities/League.js";
import {Player} from "./entities/Player.js";
import {Team} from "./entities/Team.js";
import {TransferListedPlayerFactory} from "./factories/transferListedPlayerFactory.js";
import {TransferListedPlayer} from "./entities/TransferListedPlayer.js";

async function init() {
  console.log('Connecting to PostgreSQL database...');
  const orm = await MikroORM.init(config);
  console.log('Connected to PostgreSQL database');

  try {
    const orm = await MikroORM.init(config);
    console.log('Connected to PostgreSQL database');

    console.log('Dropping database schema...');

    const em = orm.em.fork();
    const connection = em.getConnection();
    await connection.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    console.log('UUID extension enabled');

    console.log('Creating database schema...');
    await orm.schema.dropSchema();
    await orm.schema.createSchema();
    await orm.schema.refreshDatabase();
    console.log('Schema created successfully');

    // Create a league using the factory
    const leagueData = LeagueFactory.build();
    console.log('League data:', leagueData);
    await em.persistAndFlush(em.create(League, leagueData));

    // Create a team with the same gameworldId
    const teamData = TeamsFactory.build({
      gameworldId: leagueData.gameworldId,
      league: leagueData
    });
    const team = em.create(Team, teamData);
    await em.persistAndFlush(team);

    // Create players
    console.log('Inserting players into database...');
    const playerEntities = [];
    for (let i = 0; i < 10; i++) {
      const playerData = PlayerFactory.build({
        gameworldId: leagueData.gameworldId
      });
      const player = em.create(Player, playerData);
      player.team = em.getReference(Team, team.teamId);
      playerEntities.push(player);
    }
    await em.persistAndFlush(playerEntities);

    // Now create and persist listed players
    console.log('Inserting listed players into database...');
    const listedPlayerEntities = [];

    for (const player of playerEntities) {
      const listedPlayerData = TransferListedPlayerFactory.build({
        gameworldId: leagueData.gameworldId,
      });

      listedPlayerData.player = em.getReference(Player, player.playerId);


      const listedPlayer = em.create(TransferListedPlayer, listedPlayerData);
      listedPlayerEntities.push(listedPlayer);
    }

    await em.persistAndFlush(listedPlayerEntities);

    console.log(`${playerEntities.length} players inserted successfully`);
    console.log(`${listedPlayerEntities.length} listed players inserted successfully`);
  } catch (error) {
    console.error('Error:', error);
  }

  await orm.close(true);
  console.log('Database connection closed');
}

init().catch(err => console.error('Error:', err));