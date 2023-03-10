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

export interface IImageUrlInput {
  id: string;
  gameName: string;
  authToken: string;
  imageIndex: number;
  imageUrl: string;
}

export function addImageWithUrl(variables: IImageUrlInput) {
  const response = fetch(`${SERVER_URL}/dev/image/url`, {
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

// const AI_IMAGE_SERVER_URL =
//   "https://d19wdljbhh.execute-api.ap-northeast-2.amazonaws.com";

const AI_IMAGE_SERVER_URL =
  "https://v8apilr4m5.execute-api.ap-northeast-2.amazonaws.com";

export interface IAiImageInput {
  id: string;
  // gameUser: string;
  gameName: string;
  gender: string;
  hairColor: string;
  eyesColor: string;
  // cloth: string;
  token: string;
}

export function createAiImage({
  id,
  // gameUser,
  gender,
  gameName,
  hairColor,
  eyesColor,
  // cloth,
  token,
}: IAiImageInput) {
  const response = fetch(`${AI_IMAGE_SERVER_URL}/dep/gen`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      // gameUser,
      gender,
      hairColor,
      eyesColor,
      gameName,
      // cloth,
      authToken: token,
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

export interface IGetAiImageUrl {
  id: string;
  gameName: string;
  authToken: string;
}

export function getAiImageUrl({ id, gameName, authToken }: IGetAiImageUrl) {
  const response = fetch(`${AI_IMAGE_SERVER_URL}/dep/gen/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      gameName,
      authToken,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log("error:", error));

  return response;
}

export interface IRemoveImageUrlInput {
  id: string;
  gameName: string;
  authToken: string;
}

export function removeAiImageUrl(variables: IRemoveImageUrlInput) {
  const response = fetch(`${AI_IMAGE_SERVER_URL}/dep/gen/delete`, {
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
