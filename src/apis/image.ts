import { SERVER_URL } from ".";

export interface IImageInput {
  id: string;
  gameName: string;
  authToken: string;
  imageIndex: number;
  imageString: string;
}

export function addImage(variables: IImageInput) {
  const response = fetch(`${SERVER_URL}/dev/image`, {
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

export interface IImageDelete {
  id: string;
  gameName: string;
  authToken: string;
  imageIndex: number;
}

export function removeImage(variables: IImageDelete) {
  const response = fetch(`${SERVER_URL}/dev/image/delete`, {
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

const AI_IMAGE_SERVER_URL =
  "https://d19wdljbhh.execute-api.ap-northeast-2.amazonaws.com";

export interface IAiImageInput {
  gameUser: string;
  gender: string;
  hairColor: string;
  eyeColor: string;
  cloth: string;
}

export function createAiImage({
  gameUser,
  gender,
  hairColor,
  eyeColor,
  cloth,
}: IAiImageInput) {
  const response = fetch(`${AI_IMAGE_SERVER_URL}/dev/nyai/promote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameUser,
      gender,
      hairColor,
      eyeColor,
      cloth,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}

export function getLimit() {
  const response = fetch(`${SERVER_URL}/dev/limit/promote`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}
