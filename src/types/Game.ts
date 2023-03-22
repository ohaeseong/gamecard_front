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
  age: ProfileAge;
  gender: ProfileGender;
  voice: ProfileVoice;

  bg: number;      // 이건 api로 리스트 받는거 추가할것입니다
  bgCover: number; // 이것도 그래서 선택한 번호를 그대로 저장하면 됩니다
  
  friendType: ProfileFriendType[];
  playTime: ProfilePlayTime[];
  playType: ProfilePlayType[];

  lang: ProfileLang;
  desc: string; // 걍 입력받는거
  Err?: string;
}

// 국가
export enum ProfileLang {
  KO = 'ko',
}

// 나이
export enum ProfileAge {
  Kid,    // 어린이
  Adult,  // 어른
  Private,// 비공개
}

// 성별
export enum ProfileGender {
  Male,    // 남성
  Female,  // 여성
  Private,// 비공개
}

// 음성채팅
export enum ProfileVoice {
  Yes,    // 선호
  No,     // 비선호
}

// 접속 시간대
export enum ProfilePlayTime {
  Dawn,   // 새벽
  Morning,         // 아침
  Day,         // 낮
  Evening,       // 저녁
  Night,        // 밤
}

// ===========================
// 플레이 스타일
export enum ProfilePlayType {
                 // 메       롤     로     발
  TYPE_0,        // 일퀘      일겜   일퀘    직접
  TYPE_1,         // 보스     솔랭   필드보스 작성
  TYPE_2,         // 룩펙업    듀오   레이드  해주
  TYPE_3,       // 인맥       자랭팟  룩펙업  세요
  TYPE_4,        // 장사      칼바람  친목   ㅎㅎ..
}


// 선호하는 친구
export enum ProfileFriendType {
                  // 메          롤     로       발
  TYPE_0,        //  메린이       탑     모코코     직접
  TYPE_1,         // 인맥        미드    레이드  작성
  TYPE_2,         // 보스 트라이   정글    친목    해주
  TYPE_3,       //   보스 격수      원딜         세요
  TYPE_4,        //  보스 먹자     서포터        ㅎㅎ..
}

export enum ServicedGames {
  // LOL = "lol",
  MapleStory = "maplestory",
  LostArk = "lostark",
}

