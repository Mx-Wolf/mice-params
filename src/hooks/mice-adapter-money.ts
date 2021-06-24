import { MiceAdapter } from "./mice-adapter-types";

const nf = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const moneyMiceAdapter: MiceAdapter<number> = {
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
    if (typeof value === "undefined" || value === null) {
      return undefined;
    }
    return nf.format(value);
  },
  fromInit: (value)=>{
    if(typeof value === "undefined"){
      return undefined;
    }
    if(value === null){
      return null;
    }
    if(typeof value === "boolean"){
      return value?1:0;
    }
    if(typeof value ==="number"){
      return value;
    }
    const v = Number.parseFloat(value);
    if(Number.isFinite(v)){
      return v;
    }
    return undefined;
  }
}