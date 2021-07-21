import { convertPrimitiveTypeToMice } from "../utils/primitive-type-to-mice";
import { MiceAdapter } from "./mice-adapter-types";

const nf = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const moneyMiceAdapter: MiceAdapter<number> = {
  fromMice: (value) => {
    if (typeof value === "undefined") {
      return undefined;
    }
    if (value === null) {
      return null;
    }
    const res = Number.parseFloat(value);
    if (!Number.isFinite(res)) {
      return undefined;
    }
    return Math.round((100 * res)) / 100;
  },
  toMice: (value) => {
    const vs = convertPrimitiveTypeToMice(value);
    const v1 = moneyMiceAdapter.fromMice(vs);
    if (typeof v1 === "undefined") { return undefined; }
    if (v1 === null) { return null; }
    return nf.format(v1);
  },
  fromInit: (value) => {
    const vs = convertPrimitiveTypeToMice(value);
    return moneyMiceAdapter.fromMice(vs);
  }
}