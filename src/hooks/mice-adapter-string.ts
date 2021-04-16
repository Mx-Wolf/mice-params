import { MiceAdapter } from "./mice-adapter-types";

export const stringMiceAdapter: MiceAdapter<string> = {
  toMice: (value) => value,
  fromMice: (value) => value,
}