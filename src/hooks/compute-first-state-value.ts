import { getCleanStringFromParams } from "./get-clean-string-from-params";
import { MiceAdapter } from "./mice-adapter-types";
import { PrimitiveType, Relaxed } from "./type-defs";

export const computeFirstStateValue = <T>(search: string, name: string, a: MiceAdapter<T>, initialValue: Relaxed<PrimitiveType>): Relaxed<string> => {
  const firstParams = new URLSearchParams(search);
  if (!firstParams.has(name)) {
    return a.toMice(initialValue);
  }
  const clean = getCleanStringFromParams(firstParams, name);
  const v1 = a.fromMice(clean);
  return a.toMice(v1);
}