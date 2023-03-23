import { IGameProfile } from "@/types/Game";
import { SERVER_URL } from ".";

export function getGameList() {
  const response = fetch(`${SERVER_URL}/games`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}

interface IGameInput {
  id: string;
  gameName: string;
  gameUser: string;
  authToken: string;
}

export function requestAddGameWithImage(variables: IGameInput) {
  const response = fetch(`https://img.gamecard.gg/game`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...variables,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}

export function requestAddGame(variables: IGameInput) {
  const response = fetch(`https://endpoint.gamecard.gg/game`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...variables,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}

export interface IProfileInfoInput {
  id: string;
  gameName: string;
  authToken: string;
  gameProfile: IGameProfile;
}

export function requestAddProfileInfo(variables: any) {
  const response = fetch(`https://endpoint.gamecard.gg/game/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...variables,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}

export function getMapleInfo({ name }: { name: string }) {
  const response = fetch(`${SERVER_URL}/maple/promote`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameUser: name,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}
