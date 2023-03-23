export function getAgeLabel(key: string): string {
  switch (key) {
    case "kid":
      return "미성년";

    case "adult":
      return "성년";

    case "private":
      return "비공개";

    default:
      return "미성년";
  }
}

export function getGenderLabel(key: string): string {
  switch (key) {
    case "male":
      return "남성";

    case "female":
      return "여성";

    case "private":
      return "비공개";

    default:
      return "비공개";
  }
}

export function getPlayTimeLabel(key: string): string {
  switch (key) {
    case "dawn":
      return "새벽";

    case "morning":
      return "아침";

    case "day":
      return "낮";

    case "evening":
      return "저녁";

    case "night":
      return "밤";

    default:
      return "비공개";
  }
}

export function getPlayTypeLabel(key: string, game: string): string {
  if (game === "maplestory") {
    switch (key) {
      case "type_0":
        return "일퀘";

      case "type_1":
        return "보스";

      case "type_2":
        return "룩펙업";

      case "type_3":
        return "인맥";

      case "type_4":
        return "장사";

      default:
        return "비공개";
    }
  }

  if (game === "lol") {
    switch (key) {
      case "type_0":
        return "일겜";

      case "type_1":
        return "솔랭";

      case "type_2":
        return "듀오";

      case "type_3":
        return "자랭팟";

      case "type_4":
        return "칼바람";

      default:
        return "일겜";
    }
  }

  if (game === "lostark") {
    switch (key) {
      case "type_0":
        return "일퀘";

      case "type_1":
        return "필드 보스";

      case "type_2":
        return "레이드";

      case "type_3":
        return "룩펙업";

      case "type_4":
        return "친목";

      default:
        return "일퀘";
    }
  }

  if (game === "valorant") {
    switch (key) {
      case "type_0":
        return "타격대";

      case "type_1":
        return "척후대";

      case "type_2":
        return "감시자";

      case "type_3":
        return "전략가";

      case "type_4":
        return "올 라운더";

      default:
        return "올 라운더";
    }
  }

  return "";
}

export function getFriendTypeLabel(key: string, game: string): string {
  if (game === "maplestory") {
    switch (key) {
      case "type_0":
        return "메린이";

      case "type_1":
        return "인맥";

      case "type_2":
        return "보스 트라이";

      case "type_3":
        return "보스 격수";

      case "type_4":
        return "보스 먹자";

      default:
        return "메린이";
    }
  }

  if (game === "lol") {
    switch (key) {
      case "type_0":
        return "탑";

      case "type_1":
        return "미드";

      case "type_2":
        return "정글";

      case "type_3":
        return "원딜";

      case "type_4":
        return "서포터";

      default:
        return "탑";
    }
  }

  if (game === "lostark") {
    switch (key) {
      case "type_0":
        return "모코코";

      case "type_1":
        return "레이드";

      case "type_2":
        return "친목";

      default:
        return "모코코";
    }
  }

  if (game === "valorant") {
    switch (key) {
      case "type_0":
        return "타격대";

      case "type_1":
        return "척후대";

      case "type_2":
        return "감시자";

      case "type_3":
        return "전략가";

      case "type_4":
        return "올 라운더";

      default:
        return "올 라운더";
    }
  }

  return "";
}
