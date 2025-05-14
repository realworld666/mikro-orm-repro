import { Factory } from 'interface-forge';
import {Team} from "../entities/Team";

export const TeamsFactory = new Factory<Team>((factory: Factory<Team>, iteration: number) => {
  return {
    teamId: factory.string.uuid(),
    gameworldId: factory.string.uuid(),
    tier: factory.number.int({ min: 1, max: 10 }),
    teamName: factory.lorem.words(2),
    balance: factory.number.int({ min: 100000, max: 10000000 }),
    played: factory.number.int({ min: 0, max: 100 }),
    points: factory.number.int({ min: 0, max: 100 }),
    goalsFor: factory.number.int({ min: 0, max: 100 }),
    goalsAgainst: factory.number.int({ min: 0, max: 100 }),
    wins: factory.number.int({ min: 0, max: 100 }),
    draws: factory.number.int({ min: 0, max: 100 }),
    losses: factory.number.int({ min: 0, max: 100 }),
    selectionOrder: [],
    league: {
      id: factory.string.uuid(),
    },
    players: [],
  };
});
