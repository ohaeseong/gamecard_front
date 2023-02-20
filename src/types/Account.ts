import { IGames } from "./Game";
import { ITmi } from "./Tmi";

export interface IResponseLogin {
  tft: {};
  lostark: {};
  pw: string;
  lol: {};
  valorant: {};
  authToken: string;
  wildrift: {};
  login: number;
  maple: {};
  fifa4: {};
  dnf: {};
  id: string;
  Err?: string;
}

export interface IProfile {
  games: IGames;
  tmi: ITmi[];
  id: string;
  friendCount: number;
  Err?: string;
}
