import { IGame } from "@/types/Game";
import { isEmpty } from "lodash";

export function getGameAbilityFromProfile<T>(games: IGame) {
  const values = Object.keys(games)
    .filter((key) => !isEmpty(games[key]))
    .map((gameName) => {
      return {
        gameName,
        ...games[gameName],
      } as T;
    });

  return values;
}
