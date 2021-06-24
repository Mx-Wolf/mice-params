import { MiceAdapter } from "./mice-adapter-types";
const nf = new Intl.NumberFormat("en-US", { useGrouping: false, maximumFractionDigits: 20 });
export const numberMiceAdapter: MiceAdapter<number> = {
  fromMice: (value) => {
    if (typeof value === "undefined") {
      return undefined;
    }
    if (value === null) {
      return null;
    }
    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed)) {
      return undefined;
    }
    return parsed;
  },
  toMice: (value) => {
    if (typeof value === "undefined") {
      return undefined;
    }
    if (value === null) {
      return null;
    }
    return nf.format(value);
  },
  fromInit: (value) => {
    if (typeof value === "undefined") {
      return undefined;
    }
    if (value === null) {
      return null;
    }
    if (typeof value === "number") {
      if (Number.isFinite(value)) {
        return value;
      }
      return undefined;
    }
    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }
    const v = Number.parseFloat(value);
    if(Number.isFinite(v)){
      return v;
    }
    return undefined;
  }
}