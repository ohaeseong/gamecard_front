import { Maybe } from "./utileTypes";

export function safelyGet<T>(callback: () => T): Maybe<T> {
  try {
    return callback();
  } catch (e) {
    return null;
  }
}
