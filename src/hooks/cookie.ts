import Cookies from "js-cookie";
import React from "react";

export function useCookieUpdate(key: string, value?: string): void {
  React.useEffect(() => {
    if (!value || isSameValue(value)) {
      return;
    }

    setCookie(value);
  }, [value]);

  function setCookie(value: string): void {
    Cookies.set(key, value, {
      expires: 365,
      secure: true,
    });
  }

  function isSameValue(value: string): boolean {
    return Cookies.get(key) === value;
  }
}

export function setCookie(key: string, value: string) {
  Cookies.set(key, value, {
    expires: 365,
    secure: true,
  });
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}
