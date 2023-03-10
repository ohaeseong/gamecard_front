export enum ImageActionType {
  INIT = "INIT",
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}

export interface IImageResponse {
  games: {
    maplestory: {
      gallery: Array<string>;
    };
    lostark: {
      gallery: Array<string>;
    };
  };
  Err: {
    code: string;
  };
}

export interface IAiImageResponse {
  wait: number;
  Err?: string;
}

export const maleClothMap = {
  기본: "",
  티셔츠: "t-shirt,",
  "민소매 셔츠": "sleeveless_shirt,",
  가디건: "cardigan,",
  "조끼(양복)": "waistcoat,",
  재킷: "jacket,",
  "정장 재킷": "suit_jacket,",
  코트: "coat,",
  우비: "raincoat,",
  후드: "hoodie,",
  로브: "robe,",
  망토: "cape,",
  "작은 망토": "capelet,",
  "비즈니스 정장": "business_suit,",
  턱시도: "tuxedo,",
  교복: "school_uniform,",
  군복: "military_uniform,",
  점프슈트: "jumpsuit,",
  파자마: "pajamas,",
  갑옷: "armor,",
};

export const femaleClothMap = {
  기본: "",
  셔츠: "shirt,",
  티셔츠: "t-shirt,",
  "민소매 셔츠": "sleeveless_shirt,",
  "오프숄더 셔츠": "off-shoulder_shirt,",
  가디건: "cardigan,",
  크롭티: "crop_top,",
  블라우스: "blouse,",
  뷔스티에: "bustier,",
  캐미솔: "camisole,",
  "조끼(양복)": "waistcoat,",
  탱크탑: "tank_top,",
  튜브탑: "tube_top,",
  세일러복: "serafuku,",
  운동복: "track_suit,",
  재킷: "jacket,",
  "정장 재킷": "suit_jacket,",
  코트: "coat,",
  우비: "raincoat,",
  후드: "hoodie,",
  로브: "robe,",
  망토: "cape,",
  "작은 망토": "capelet,",
  "비즈니스 정장": "business_suit,",
  턱시도: "tuxedo,",
  교복: "school_uniform,",
  군복: "military_uniform,",
  점프슈트: "jumpsuit,",
  파자마: "pajamas,",
  갑옷: "armor,",
  "드레스 갑옷": "armored_dress,",
  수영복: getRandomSwimsuit(),
  드레스: getRandomDress(),
};

function getRandomDress() {
  const random = Math.floor(Math.random() * 18);

  switch (random) {
    case 1:
      return "negligee,";
    case 2:
      return "wedding_dress,";
    case 3:
      return "evening_gown,";
    case 4:
      return "nightgown,";
    case 6:
      return "coat_dress,";
    case 7:
      return "_dress,";
    case 8:
      return "collared_dress,";
    case 9:
      return "lace-trimmed_dress,";
    case 10:
      return "ribbon-trimmed_dress,";
    case 11:
      return "layered_dress,";
    case 13:
      return "taut_dress,";
    case 14:
      return "pencil_dress,";
    case 15:
      return "halter_dress,";
    case 16:
      return "flowing_dress,";
    case 17:
      return "sleeveless_dress,";

    default:
    case 0:
      return "_dress,";
  }
}

function getRandomSwimsuit() {
  const random = Math.floor(Math.random() * 9);

  switch (random) {
    case 1:
      return "bikini_skirt,";
    case 2:
      return "rash_guard (swim_shirt),";
    case 3:
      return "sports_bikini,";
    case 4:
      return "one-piece_swimsuit,";
    case 5:
      return "dress_swimsuit,";
    case 6:
      return "casual_one-piece_swimsuit,";
    case 7:
      return "o-ring_bikini,";
    case 8:
      return "checkered_bikini,";

    default:
    case 0:
      return "bikini,";
  }
}
