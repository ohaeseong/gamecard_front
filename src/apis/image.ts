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
