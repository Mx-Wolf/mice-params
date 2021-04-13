import { MiceAdapter } from "./mice-adapter-types";

export const stringToMice: MiceAdapter<string> = {
  toMice: (value) => value,
  fromMice: (value) => value,
}