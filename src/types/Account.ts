import { IGame } from "./Game";
import { ITmi } from "./Tmi";

export interface IResponseLogin {
  tft: {};
  lostark: {};
  pw: "1234";
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
  games: IGame;
  tmi: ITmi[];
  id: string;
  friendCount: number;
  Err?: string;
}
