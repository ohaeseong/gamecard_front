import { SERVER_URL } from ".";

export function getGameList() {
  const response = fetch(`${SERVER_URL}/dev/games`, {
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

export function requestAddGame(variables: IGameInput) {
  const response = fetch(`${SERVER_URL}/dev/game`, {
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

export function getMapleInfo({ name }: { name: string }) {
  const response = fetch(`${SERVER_URL}/dev/maple/promote`, {
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
