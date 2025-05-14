import { Entity, Index, ManyToOne, PrimaryKey, Property, type Rel, Unique } from '@mikro-orm/core';
import { Team } from './Team.js';
import { TransferListedPlayer } from './TransferListedPlayer.js';

@Entity({ tableName: 'bid_history' })
export class BidHistory {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @ManyToOne(() => TransferListedPlayer, { fieldName: 'transfer_listing_id' })
  @Index() // Add index for faster lookups
  transferListing!: Rel<TransferListedPlayer>;

  @ManyToOne(() => Team, { fieldName: 'team_id' })
  @Index() // Add index for faster lookups
  team!: Rel<Team>;

  @Property({ type: 'numeric', precision: 15, scale: 2 })
  maximumBid!: number;

  @Property({ type: 'bigint' })
  bidTime!: number;

  @Property({ type: 'boolean', default: false })
  isWinningBid: boolean = false;

  // Add a unique constraint that allows a team to update their bid
  @Unique({ properties: ['transferListing', 'team'] })
  teamBidConstraint?: string;
}
