import { Entity, MikroORM, PrimaryKey, Property } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

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
  orm = await MikroORM.init<PostgreSqlDriver>({
    type: 'postgresql',
    dbName: 'mikro_test',
    user: 'mikro',
    password: 'mikro',
    host: 'localhost',
    port: 5432,
    entities: [User],
    debug: ['query', 'query-params'],
    allowGlobalContext: true, // only for testing
  });
  await orm.schema.refreshDatabase(); // This will drop and recreate the schema
});

afterAll(async () => {
  await orm.close(true);
});

test('PostgreSQL basic CRUD example', async () => {
  orm.em.create(User, { name: 'Foo', email: 'foo@example.com' });
  await orm.em.flush();
  orm.em.clear();

  const user = await orm.em.findOneOrFail(User, { email: 'foo@example.com' });
  expect(user.name).toBe('Foo');
  user.name = 'Bar';
  await orm.em.flush();
  orm.em.clear();

  const updatedUser = await orm.em.findOneOrFail(User, { email: 'foo@example.com' });
  expect(updatedUser.name).toBe('Bar');
  
  orm.em.remove(updatedUser);
  await orm.em.flush();

  const count = await orm.em.count(User, { email: 'foo@example.com' });
  expect(count).toBe(0);
});

// Add your reproduction test case here
test('Your reproduction test case', async () => {
  // Add your specific test case that reproduces the issue you're having
  // This is where you would implement the specific scenario that's causing problems
  // in your production environment
  
  // Example:
  // 1. Create entities with specific relationships
  // 2. Perform operations that trigger the issue
  // 3. Assert the expected vs actual behavior
});
