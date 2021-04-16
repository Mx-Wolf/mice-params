import { useHistory } from "react-router-dom";
import { MiceAdapter } from "./mice-adapter-types";

export type UriHook = <T>(name: string, adapter: MiceAdapter<T>) => [value: T | undefined, setValue: (value: T | undefined) => void];

export const useQueryStringValue: UriHook = <T>(name: string, adapter: MiceAdapter<T>) => {
  const { fromMice, toMice } = adapter;
  const history = useHistory();
  const qs = new URLSearchParams(history.location.search);
  const value: string | undefined = qs.get(name) || undefined;
  const setValue: (value: string | undefined) => void = (nv) => {
    if (typeof nv === "undefined") {
      qs.delete(name);
    } else {
      qs.set(name, nv);
    }
    qs.sort();
    history.replace({ ...history.location, search: qs.toString() });
  };
  return [fromMice(value), (value: T | undefined) => setValue(toMice(value))];
}