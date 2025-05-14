import {
  Cascade,
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property, Ref,
  Unique,
} from '@mikro-orm/core';
import { BidHistory } from './BidHistory.js';
import { Player } from './Player.js';

@Entity({ tableName: 'transfer_list' })
export class TransferListedPlayer {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property({ type: 'uuid' })
  @Index() // Add index for faster lookups
  gameworldId!: string;

  @ManyToOne(() => Player, { cascade: [Cascade.ALL], ref: true })
  @Unique({ properties: ['player', 'gameworldId'] })
  player!: Ref<Player>;

  @Property({ type: 'numeric', precision: 15, scale: 2 })
  auctionStartPrice!: number;

  @Property({ type: 'numeric', precision: 15, scale: 2 })
  auctionCurrentPrice!: number;

  @Property({ type: 'bigint' })
  @Index() // Add index for faster queries on auction end time
  auctionEndTime!: number;

  @Property({ type: 'int' })
  auctionListingCounter: number = 0;

  @Property({ type: 'bigint' })
  createdAt: number = Date.now();

  @OneToMany(() => BidHistory, (bidHistory) => bidHistory.transferListing, {
    orphanRemoval: true, // Automatically remove bids when a listing is removed
    cascade: [Cascade.ALL], // Cascade all operations to bids
  })
  bidHistory = new Collection<BidHistory>(this);
}
