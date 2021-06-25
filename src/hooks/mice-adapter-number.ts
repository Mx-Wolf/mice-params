import { convertPrimitiveTypeToMice } from "../utils/primitive-type-to-mice";
import { MiceAdapter } from "./mice-adapter-types";

export const numberMiceAdapter: MiceAdapter<number> = {
  fromMice: (value) => {
    if (typeof value === "undefined") {
      return undefined;
    }
    if(value === null){
      return null;
    }
    const res = Number.parseFloat(value);
    if (!Number.isFinite(res)) {
      return undefined;
    }
    return res;
  },
  toMice: (value) => {
    const vs = convertPrimitiveTypeToMice(value);
    const v1 = numberMiceAdapter.fromMice(vs);
    return convertPrimitiveTypeToMice(v1);
  },
  fromInit: (value)=>{
    const vs = convertPrimitiveTypeToMice(value);
    return numberMiceAdapter.fromMice(vs);
  }
}