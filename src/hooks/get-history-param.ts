import { getCleanStringFromParams } from "./get-clean-string-from-params";
import { Relaxed } from "./type-defs";

export const getHistoryParam = (search: string, name: string): Relaxed<string> => {  
  return getCleanStringFromParams(new URLSearchParams(search),name);
}
