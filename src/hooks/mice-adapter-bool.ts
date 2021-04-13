import { MiceAdapter } from "./mice-adapter-types";

export const boolMiceAdapter:MiceAdapter<boolean>={
  fromMice:(value)=> !!value,
  toMice:(value)=>value?"1":undefined,
}