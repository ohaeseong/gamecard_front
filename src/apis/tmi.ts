import { SERVER_URL } from ".";

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

interface ITmiInput {
  id: string;
  tmiName: string;
  tmiContent: string;
  authToken: string;
}

export function requestAddTmi(variables: ITmiInput) {
  const response = fetch(`${SERVER_URL}/dev/tmi`, {
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

interface ITmiInputUpdate {
  id: string;
  tmiName: string;
  tmiContent: string;
  authToken: string;
  tmiIndex: number;
}

export function requestUpdateTmi(variables: ITmiInputUpdate) {
  const response = fetch(`${SERVER_URL}/dev/tmi`, {
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
