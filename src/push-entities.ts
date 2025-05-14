import config from './mikro-orm.config.js';
import { MikroORM } from '@mikro-orm/core';

async function init() {
  console.log('Connecting to PostgreSQL database...');
  const orm = await MikroORM.init(config);
  console.log('Connected to PostgreSQL database');

  try {
    const connection = orm.em.getConnection();
    await connection.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    console.log('UUID extension enabled');

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
