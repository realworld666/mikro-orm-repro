import { Factory } from 'interface-forge';
import { League } from "../entities/League.js";

export const LeagueFactory = new Factory<League>((factory: Factory<League>, iteration: number) => {
    return {
        id: factory.string.uuid(),
        gameworldId: factory.string.uuid(),
        name: factory.lorem.words(2),
        tier: factory.number.int({ min: 1, max: 5 }),
        teams: [],
    };
});