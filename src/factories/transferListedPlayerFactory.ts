import { BidHistory } from '@/entities/BidHistory.js';
import { TransferListedPlayer } from '@/entities/TransferListedPlayer.js';
import { PlayerFactory } from '@/testing/playersTestUtils.js';
import { Collection } from '@mikro-orm/core';
import { Factory } from 'interface-forge';

export const TransferListedPlayerFactory = new Factory<TransferListedPlayer>(
  (factory: Factory<TransferListedPlayer>, iteration: number) => {
    return {
      playerId: factory.string.uuid(),
      gameworldId: factory.string.uuid(),
      player: PlayerFactory.build(),
      auctionStartPrice: factory.number.float({ min: 1000, max: 100000, fractionDigits: 2 }),
      auctionCurrentPrice: factory.number.float({ min: 1000, max: 100000, fractionDigits: 2 }),
      auctionEndTime: factory.date.future().getTime(),
      bidHistory: new Collection<BidHistory>({}), // Empty collection for bid history
      auctionListingCounter: factory.number.int({ min: 0, max: 3 }),
    };
  }
);
