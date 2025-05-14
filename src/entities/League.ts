import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Team } from './Team.js';

@Entity({ tableName: 'league' })
export class League {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'uuid' })
  gameworldId!: string;

  @Property()
  name!: string;

  @Property()
  tier!: number;

  @OneToMany(() => Team, (team) => team.league)
  teams = new Collection<Team>(this);
}
