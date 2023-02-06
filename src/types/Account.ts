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
  games?: {
    lol?: {};
    maple?: {};
    valorant?: {};
    wildrift?: {};
    tft?: {};
    fifa4?: {};
    dnf?: {};
    lostark?: {};
  };
  tmi: [];
  id: string;
  Err?: string;
}
