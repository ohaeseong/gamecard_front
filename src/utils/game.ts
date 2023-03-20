import { IGames } from "@/types/Game";
import { isEmpty } from "lodash";

export function getGameAbilityFromProfile<T>(games: IGames) {
  const values = Object.keys(games)
    .filter((key) => !isEmpty(games[key]))
    .map((gameName) => {
      return {
        gameName,
        ...games[gameName],
      } as unknown as T;
    });

  return values;
}
