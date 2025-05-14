// This is a JavaScript version of the push-entities script
// to avoid TypeScript compilation issues

const { MikroORM } = require('@mikro-orm/core');

async function init() {
  console.log('Connecting to PostgreSQL database...');
  
  const orm = await MikroORM.init({
    type: 'postgresql',
    dbName: 'mikro_test',
    user: 'mikro',
    password: 'mikro',
    host: 'localhost',
    port: 5432,
    // Auto-discover entities in the entities directory
    entities: ['./dist/entities'],
    discovery: {
      warnWhenNoEntities: false,
    },
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
