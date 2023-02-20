export interface IGames {
  [key: string]: object;
  lol: ILol;
  maple: IMapleStory;
  valorant: {};
  wildrift: {};
  tft: {};
  fifa4: {};
  dnf: {};
  lostark: {};
}

export interface ILol {
  freeTier: string;
  imageUrl: string;
  level: number;
  name: string;
  tier: string;
  updateTime: number;
  verified: boolean;
  gameName: ServicedGames;
}

export interface IMapleStory {
  name: string;
  world: string;
  job: string;
  level: number;
  imageUrl: string;
  updateTime: number;
  verified: boolean;
  gameName: ServicedGames;
  gallery: Array<string>;
}

export enum ServicedGames {
  LOL = "lol",
  MapleStory = "maplestory",
}
