import { Entity, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Team } from './Team.js';

@Entity({ tableName: 'manager' })
export class Manager {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'uuid' })
  gameworldId!: string;

  @Property()
  name!: string;

  @OneToOne(() => Team, (team) => team.manager)
  team!: Ref<Team>;
}
