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
  profile: IGameProfile;
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
  profile?: IGameProfile;
}

export interface IMapleInfoResponse {
  imageUrl: string;
  job: string;
  name: string;
  state: string;
  world: string;
  Err?: string;
  profile?: IGameProfile;
}

export interface IGameProfile {
  age: number;
  gender: number;
  voice: number;

  bg: number; // 이건 api로 리스트 받는거 추가할것입니다
  bgCover: number; // 이것도 그래서 선택한 번호를 그대로 저장하면 됩니다

  friendType: number[];
  playTime: number[];
  playType: number[];

  lang: ProfileLang;
  desc: string; // 걍 입력받는거
  Err?: string;
  setup?: boolean;
}

// 국가
export enum ProfileLang {
  KO = "ko",
}

// 나이
export enum ProfileAge {
  Kid = "kid", // 어린이
  Adult = "adult", // 어른
  Private = "private", // 비공개
}

// 성별
export enum ProfileGender {
  Male = "male", // 남성
  Female = "female", // 여성
  Private = "private", // 비공개
}

// 음성채팅
export enum ProfileVoice {
  Yes = "yes", // 선호
  No = "no", // 비선호
}

// 접속 시간대
export enum ProfilePlayTime {
  Dawn = "dawn", // 새벽
  Morning = "morning", // 아침
  Day = "day", // 낮
  Evening = "evening", // 저녁
  Night = "night", // 밤
}

// ===========================
// 플레이 스타일
export enum ProfilePlayType {
  // 메       롤     로     발
  TYPE_0 = "type_0", // 일퀘      일겜   일퀘    직접
  TYPE_1 = "type_1", // 보스     솔랭   필드보스 작성
  TYPE_2 = "type_2", // 룩펙업    듀오   레이드  해주
  TYPE_3 = "type_3", // 인맥       자랭팟  룩펙업  세요
  TYPE_4 = "type_4", // 장사      칼바람  친목   ㅎㅎ..
}

// 선호하는 친구
export enum ProfileFriendType {
  // 메          롤     로       발
  TYPE_0 = "type_0", //  메린이       탑     모코코     직접
  TYPE_1 = "type_1", // 인맥        미드    레이드  작성
  TYPE_2 = "type_2", // 보스 트라이   정글    친목    해주
  TYPE_3 = "type_3", //   보스 격수      원딜         세요
  TYPE_4 = "type_4", //  보스 먹자     서포터        ㅎㅎ..
}

export enum ServicedGames {
  VALORANT = "valorant",
  LOL = "lol",
  MapleStory = "maplestory",
  LostArk = "lostark",
}

export enum MapleCards {
  TYPE_0 = "엘리니아",
  TYPE_1 = "엘린 숲",
  TYPE_2 = "여왕의 성",
  TYPE_3 = "저주받은 신전",
  TYPE_4 = "페리온",
  TYPE_5 = "헤네시스",
  TYPE_6 = "아브락사스 유적",
  TYPE_7 = "메이플 아일랜드",
  TYPE_8 = "리스 항구",
  TYPE_9 = "커닝 시팅",
}
