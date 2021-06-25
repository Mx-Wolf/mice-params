import { convertPrimitiveTypeToMice } from "../utils/primitive-type-to-mice";
import { MiceAdapter } from "./mice-adapter-types";

export const dateMiceAdapter: MiceAdapter<Date> = {
  fromMice: (value) => {
    if (typeof value === "undefined") {
      return undefined;
    }
    if (value === null) {
      return null;
    }
    const [year, monthz, day] = value.substr(0, 10).split("-");
    const r = new Date(Number(year), -1 + Number(monthz), Number(day));
    if (Number.isNaN(r.valueOf())) {
      return undefined;
    }
    return r;
  },
  toMice: (value) => {
    const vs = convertPrimitiveTypeToMice(value);
    const v1 = dateMiceAdapter.fromMice(vs);
    const r1 = convertPrimitiveTypeToMice(v1);
    return r1;
  },
  fromInit: (value) => {
    const vs = convertPrimitiveTypeToMice(value);
    return dateMiceAdapter.fromMice(vs);
  }
}