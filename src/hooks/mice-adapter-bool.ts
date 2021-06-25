import { convertPrimitiveTypeToMice } from "../utils/primitive-type-to-mice";
import { MiceAdapter } from "./mice-adapter-types";

export const boolMiceAdapter: MiceAdapter<boolean> = {
  fromMice: (value) => {
    if (typeof value === "undefined") {
      return undefined;
    }
    if (value === null) {
      return null;
    }
    switch (value) {
      case "true":
      case "1": return true;
      case "false":
      case "0": return false;
    }
    return !!value;
  },
  toMice: convertPrimitiveTypeToMice,
  fromInit: (value)=>{
    const vs = convertPrimitiveTypeToMice(value);
    return boolMiceAdapter.fromMice(vs);
  }
}