import { Collection } from '@mikro-orm/core';
import { Factory } from 'interface-forge';
import {TransferListedPlayer} from "../entities/TransferListedPlayer.js";
import {PlayerFactory} from "./playerFactory.js";
import {BidHistory} from "../entities/BidHistory.js";

export const TransferListedPlayerFactory = new Factory<TransferListedPlayer>(
  (factory: Factory<TransferListedPlayer>, iteration: number) => {
    return {
      id: factory.string.uuid(),
        createdAt: factory.date.past().getTime(),
      playerId: factory.string.uuid(),
      gameworldId: factory.string.uuid(),
      player: PlayerFactory.build(),
      auctionStartPrice: factory.number.float({ min: 1000, max: 100000, fractionDigits: 2 }),
      auctionCurrentPrice: factory.number.float({ min: 1000, max: 100000, fractionDigits: 2 }),
      auctionEndTime: factory.date.past({years:1}).getTime(),
      //bidHistory: new Collection<BidHistory>({}), // Empty collection for bid history
      auctionListingCounter: factory.number.int({ min: 0, max: 3 }),
    };
  }
);
