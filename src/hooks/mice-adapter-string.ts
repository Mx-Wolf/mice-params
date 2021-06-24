import { boolMiceAdapter } from "./mice-adapter-bool";
import { numberMiceAdapter } from "./mice-adapter-number";
import { MiceAdapter } from "./mice-adapter-types";

export const stringMiceAdapter: MiceAdapter<string> = {
  toMice: (value) => value,
  fromMice: (value) => value,
  fromInit: (value) => {
    if (typeof value === "undefined") {
      return undefined;
    }
    if (value === null) {
      return null;
    }
    if (typeof value === "string") {
      return value;
    }
    if (typeof value === "boolean") {
      return boolMiceAdapter.toMice(value);
    }
    if(typeof value === "number"){
      return numberMiceAdapter.toMice(value);
    }
    return undefined;
  }
}