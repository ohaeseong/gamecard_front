import { SERVER_URL } from ".";

interface IAccountInput {
  id: string;
  pw: string;
}

export function createAccount({ id, pw }: IAccountInput) {
  const response = fetch(`${SERVER_URL}/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      pw,
      tickets: 10,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}

export async function login({ id, pw }: IAccountInput) {
  const response = await fetch(`${SERVER_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      pw,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}
