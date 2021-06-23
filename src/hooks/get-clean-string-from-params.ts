import { urlToString } from "../utils/url-to-string";
import { Relaxed } from "./type-defs";

export const getCleanStringFromParams = (params:URLSearchParams, name:string):Relaxed<string> => {
  return urlToString(params.get(name));
}