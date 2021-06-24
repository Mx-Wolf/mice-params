import { MiceAdapter } from "./mice-adapter-types";

const lz = (v: number) => v >= 10 ? v.toString() : `0${v}`;

export const dateMiceAdapter: MiceAdapter<Date> = {
  fromMice: (value) => {
    if (typeof value === "undefined" || value === null) {
      return undefined;
    }
    const [year, monthz, day] = value.substr(0, 10).split("-");
    const r = new Date(Number(year), -1 + Number(monthz), Number(day));
    if (Number.isNaN(r.valueOf())) {
      return undefined;
    }
    return r;
  },
  toMice: (value) => {
    if (typeof value === "undefined" || value === null) {
      return undefined;
    }
    return `${value.getFullYear()}-${lz(+1 + value.getMonth())}-${lz(value.getDate())}`
  },
  fromInit: (value)=>{
    if(typeof value=== "undefined"){
      return undefined;
    }
    if(value === null){
      return null;
    }
    if(typeof value === "boolean"){
      return undefined;
    }
    if(typeof value === "string"){
      dateMiceAdapter.fromMice(value);
    }
    if(typeof value === "number"){
      const d = new Date();
      d.setHours(0,0,0,0);
      d.setDate(d.getDate()+value);
      return d;
    }
    return undefined;
  }
}