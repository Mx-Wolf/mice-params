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
  toMice: (value) => {
    if(typeof value === "undefined"){
      return undefined;
    }
    if(value === null){
      return null;
    }
    return value?"1":"0";
  },
  fromInit: (value)=>{
    if(typeof value === "undefined"){
      return undefined;
    }
    if(value === null){
      return null;
    }
    if(typeof value === "boolean"){
      return value;
    }
    if(typeof value === "string"){
      return boolMiceAdapter.fromMice(value);
    }
    return !!value;
  }
}