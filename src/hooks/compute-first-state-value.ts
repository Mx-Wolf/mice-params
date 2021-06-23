import { getCleanStringFromParams } from "./get-clean-string-from-params";
import { MiceAdapter } from "./mice-adapter-types";
import { Relaxed } from "./type-defs";

export const computeFirstStateValue = <T>(search: string, name: string, a: MiceAdapter<T>, initialValue: Relaxed<T>):Relaxed<string> => {
  const firstParams = new URLSearchParams(search);
  if (!firstParams.has(name)) {
    return a.toMice(initialValue);
  }
  return a.toMice(a.fromMice(getCleanStringFromParams(firstParams,name)));
}