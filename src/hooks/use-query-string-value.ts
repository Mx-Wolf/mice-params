import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MiceAdapter } from "./mice-adapter-types";

export type UriHook = <T>(name: string, adapter: MiceAdapter<T>, value: T | null | undefined) => [value: T | null | undefined, setValue: (value: T | null | undefined) => void];

export const useQueryStringValue: UriHook = <T>(name: string, adapter: MiceAdapter<T>, initialValue: T | null | undefined = undefined) => {
  const { fromMice, toMice } = adapter;
  const history = useHistory();
  const originalqs = new URLSearchParams(history.location.search);
  const value: string | null | undefined = originalqs.get(name) || undefined;
  const setValue: (value: string | null | undefined) => void = useCallback((nv) => {
    const nextqs = new URLSearchParams(history.location.search);
    if (typeof nv === "undefined" || nv === null) {
      nextqs.delete(name);
    } else {
      nextqs.set(name, nv);
    }
    nextqs.sort();
    history.replace({ ...history.location, search: nextqs.toString() });
  }, [history, name]);
  const [iv] = useState(value || toMice(initialValue));
  useEffect(() => {
    if (
      (typeof value === undefined || value === null)
      && typeof iv !== "undefined"
      && iv !== null) {
      setValue(iv);
    }
  }, [iv, setValue])
  return [fromMice(value), (value: T | null | undefined) => setValue(toMice(value))];
}