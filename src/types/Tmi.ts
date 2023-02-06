export interface ITmi {
  name: TmiTypes;
  content: string;
}

export enum TmiTypes {
  ESPORTS = "esports",
  CONSOLE = "console",
  YOUTUBE = "youtube",
  TWITCH = "twitch",
  ETC = "etc",
}
