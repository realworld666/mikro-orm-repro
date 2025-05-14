import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  type Opt,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
  Ref,
  Unique,
} from '@mikro-orm/core';
import { Player } from './Player.js';
import { League } from './League.js';
import { Manager } from './Manager.js';

@Entity({ tableName: 'team' })
@Unique({ name: 'teams_gameworld_id_team_id_key', properties: ['gameworldId', 'teamId'] })
export class Team {
  [PrimaryKeyProp]?: 'teamId';

  @PrimaryKey({ type: 'uuid', unique: 'teams_pkey' })
  teamId!: string;

  @Property({ type: 'uuid' })
  gameworldId!: string;

  @Property()
  tier!: number;

  @Property({ length: 100 })
  teamName!: string;

  @ManyToOne(() => League)
  league!: League;

  @OneToOne({ entity: () => Manager, mappedBy: 'team', nullable: true })
  manager?: Ref<Manager>;

  @Property({ type: 'uuid', nullable: true })
  managerId?: string;

  // Other properties remain unchanged
  @Property({ type: 'integer' })
  balance: number & Opt = 300000;

  @Property({ type: 'integer' })
  played: number & Opt = 0;

  @Property({ type: 'integer' })
  points: number & Opt = 0;

  @Property({ type: 'integer' })
  goalsFor: number & Opt = 0;

  @Property({ type: 'integer' })
  goalsAgainst: number & Opt = 0;

  @Property({ type: 'integer' })
  wins: number & Opt = 0;

  @Property({ type: 'integer' })
  draws: number & Opt = 0;

  @Property({ type: 'integer' })
  losses: number & Opt = 0;

  @Property({ type: 'string[]' })
  selectionOrder: string[] & Opt = [];

  @OneToMany(() => Player, (player) => player.team)
  players = new Collection<Player>(this);
}