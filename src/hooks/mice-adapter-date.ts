import { MiceAdapter } from "./mice-adapter-types";

const lz = (v:Number)=>v>=10?v.toString():`0${v}`;

export const dateMiceAdapter:MiceAdapter<Date> ={
  fromMice:(value)=> {
    if(typeof value === "undefined"){
      return undefined;
    }
    const [year, monthz, day] = value.substr(0,10).split("-");
    return new Date(Number(year),-1+Number(monthz), Number(day));
  },
  toMice: (value)=>{
    if(typeof value === "undefined"){
      return undefined;
    }
    return `${value.getFullYear()}-${lz(value.getMonth())}-${lz(value.getDate())}`
  }
}