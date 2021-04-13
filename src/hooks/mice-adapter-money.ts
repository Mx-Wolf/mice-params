import { MiceAdapter } from "./mice-adapter-types";

const nf = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const moneyMiceAdapter: MiceAdapter<number> = {
  fromMice: (value) => {
    if (typeof value === "undefined") {
      return undefined;
    }
    var res = Number.parseFloat(value);
    if (Number.isNaN(res)) {
      return undefined;
    }
    return res;
  },
  toMice:(value)=>{
    if(typeof value ==="undefined"){
      return undefined;
    }
    return nf.format(value);
  }
}