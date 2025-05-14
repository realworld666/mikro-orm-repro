import {
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
  Ref,
  Unique,
} from '@mikro-orm/core';
import { Team } from './Team.js';

@Entity({ tableName: 'players' })
@Unique({ name: 'players_gameworld_id_player_id_key', properties: ['gameworldId', 'playerId'] })
export class Player {
  [PrimaryKeyProp]?: 'playerId';

  @PrimaryKey({ type: 'uuid' })
  playerId!: string;

  @Property({ type: 'uuid' })
  gameworldId!: string;

  @ManyToOne({ entity: () => Team, fieldName: 'team_id', nullable: true })
  team?: Ref<Team>;

  @Property()
  age!: number;

  @Property({ type: 'bigint' })
  seed!: number;

  @Property()
  firstName!: string;

  @Property()
  surname!: string;

  @Property({ type: 'numeric', precision: 15, scale: 2 })
  value!: number;

  @Property({ type: 'int' })
  energy!: number; // 0 - 100 value

  @Property({ type: 'bigint' })
  lastMatchPlayed!: number;

  @Property({ nullable: true, type: 'bigint' })
  injuredUntil?: number;

  @Property()
  suspendedForGames!: number;

  @Property({ type: 'boolean', default: false })
  isTransferListed: boolean = false;
}
