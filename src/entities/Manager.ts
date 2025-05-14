import { Entity, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Team } from './Team.js';

@Entity({ tableName: 'manager' })
export class Manager {
  @PrimaryKey({ type: 'uuid' })
  managerId!: string;

  @Property({ type: 'bigint' })
  createdAt!: number;

  @Property({ type: 'bigint' })
  lastActive!: number;

  @Property({ length: 100, nullable: true })
  firstName?: string;

  @Property({ length: 100, nullable: true })
  lastName?: string;

  @Property({ type: 'string', nullable: true })
  email?: string;

  @OneToOne({ entity: () => Team, fieldName: 'team_id', nullable: true })
  team?: Ref<Team>;

  @Property({ type: 'uuid', nullable: true })
  gameworldId?: string;

  @Property({ type: 'integer' })
  scoutTokens: number = 0;

  @Property({ type: 'integer' })
  superScoutTokens: number = 0;
}
