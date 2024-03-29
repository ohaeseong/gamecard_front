import { isNull } from "lodash";
import type { NextPageContext } from "next";
import cookies from "next-cookies";
import { safelyGet } from "./misc";

export function getCookieFromContext<T>(
  ctx: NextPageContext,
  key: string,
  defaultValue: T
): T | string {
  const value = safelyGet(() => cookies(ctx)[key]);

  if (!value) return defaultValue;

  const parsedValue = safelyGet(() => JSON.parse(value));

  return isNull(parsedValue) ? value : parsedValue;
}

export function clearLoginInfoCookie<T>(
  ctx: NextPageContext,
  key: string,
  defaultValue: T
): T | string {
  const value = safelyGet(() => cookies(ctx)[key]);

  if (!value) return defaultValue;

  const parsedValue = safelyGet(() => JSON.parse(value));

  return isNull(parsedValue) ? value : parsedValue;
}
