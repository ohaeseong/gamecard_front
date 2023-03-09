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

export interface ILostArk {
  gameName: string;
  imageUrl: string;
  itemLevel: number;
  job: string;
  level: string;
  name: string;
  updateTime: number;
  verified: boolean;
  world: string;
  gallery: Array<string>;
}

export interface IMapleInfoResponse {
  imageUrl: string;
  job: string;
  name: string;
  state: string;
  world: string;
  Err?: string;
}

export enum ServicedGames {
  // LOL = "lol",
  MapleStory = "maplestory",
  LostArk = "lostark",
}
