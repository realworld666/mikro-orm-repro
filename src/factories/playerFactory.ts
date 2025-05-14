import { Ref, Rel } from '@mikro-orm/core';
import { Factory } from 'interface-forge';
import {Player} from "../entities/Player.js";
import {League} from "../entities/League.js";

export const PlayerFactory = new Factory<Player>((factory: Factory<Player>, iteration: number) => {
  return {
    playerId: factory.string.uuid(),
    gameworldId: factory.string.uuid(),
    teamId: factory.string.uuid(),
    leagueId: {
      id: factory.string.uuid(),
    } as Ref<League>,
    firstName: factory.person.firstName(),
    surname: factory.person.lastName(),
    age: factory.number.int({ min: 17, max: 39 }),
    seed: factory.number.int({ min: 0, max: 1000000 }),
    value: factory.number.int({ min: 100000, max: 10000000 }),
    energy: factory.number.int({ min: 0, max: 100 }),
    lastMatchPlayed: factory.date.recent({days:1}).getTime(),
    suspendedForGames: factory.number.int({ min: 0, max: 10 }),
    attributes: {
      player: {} as Rel<Player>,
      reflexesCurrent: factory.number.int({ min: 1, max: 20 }),
      reflexesPotential: factory.number.int({ min: 1, max: 20 }),
      positioningCurrent: factory.number.int({ min: 1, max: 20 }),
      positioningPotential: factory.number.int({ min: 1, max: 20 }),
      shotStoppingCurrent: factory.number.int({ min: 1, max: 20 }),
      shotStoppingPotential: factory.number.int({ min: 1, max: 20 }),
      tacklingCurrent: factory.number.int({ min: 1, max: 20 }),
      tacklingPotential: factory.number.int({ min: 1, max: 20 }),
      markingCurrent: factory.number.int({ min: 1, max: 20 }),
      markingPotential: factory.number.int({ min: 1, max: 20 }),
      headingCurrent: factory.number.int({ min: 1, max: 20 }),
      headingPotential: factory.number.int({ min: 1, max: 20 }),
      finishingCurrent: factory.number.int({ min: 1, max: 20 }),
      finishingPotential: factory.number.int({ min: 1, max: 20 }),
      paceCurrent: factory.number.int({ min: 1, max: 20 }),
      pacePotential: factory.number.int({ min: 1, max: 20 }),
      crossingCurrent: factory.number.int({ min: 1, max: 20 }),
      crossingPotential: factory.number.int({ min: 1, max: 20 }),
      passingCurrent: factory.number.int({ min: 1, max: 20 }),
      passingPotential: factory.number.int({ min: 1, max: 20 }),
      visionCurrent: factory.number.int({ min: 1, max: 20 }),
      visionPotential: factory.number.int({ min: 1, max: 20 }),
      ballControlCurrent: factory.number.int({ min: 1, max: 20 }),
      ballControlPotential: factory.number.int({ min: 1, max: 20 }),
      stamina: factory.number.float({min: 0.1, max: 1.0})
    },
    matchHistory: [],
  };
});
