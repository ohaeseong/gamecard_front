import { SERVER_URL } from ".";

interface IProfileParams {
  id: string;
}

export function getProfileById({ id }: IProfileParams) {
  const response = fetch(`${SERVER_URL}/dev/profile?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}

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

export function getTMIList() {
  const response = fetch(`${SERVER_URL}/dev/tmis`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}
