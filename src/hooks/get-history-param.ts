import { urlToString } from "../utils/url-to-string";
import { getCleanStringFromParams } from "./get-clean-string-from-params";
import { Relaxed } from "./type-defs";

export const getHistoryParam = (search: string, name: string): Relaxed<string> => {
  return getCleanStringFromParams(new URLSearchParams(search), name);
}

export const getAllParams = (search: string): Record<string, Relaxed<string>> => {
  const p = new URLSearchParams(search);
  return [...p.keys()].reduce((a, b) => {
    a[b] = urlToString(p.get(b))
    return a;
  }, {} as Record<string, Relaxed<string>>);
}