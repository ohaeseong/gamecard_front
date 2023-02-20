import isArray from "lodash/isArray";

export function append<T>(arr: T[], item: T | T[]): T[] {
  return arr.concat(item);
}

export function insert<T>(arr: T[], item: T): T[] {
  return [item].concat(arr);
}

export function removeAtIndex<T>(arr: T[], index: number): T[] {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

export function updateAtIndex<T>(arr: T[], index: number, item: T): T[] {
  return arr.slice(0, index).concat(item, arr.slice(index + 1));
}

export function insertAtIndex<T>(arr: T[], index: number, item: T | T[]): T[] {
  const items = isArray(item) ? item : [item];
  if (index === 0) {
    return [...items, ...arr];
  }

  return [...arr.slice(0, index), ...items, ...arr.slice(index)];
}
