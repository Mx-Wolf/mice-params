import { convertPrimitiveTypeToMice } from "../utils/primitive-type-to-mice";
import { MiceAdapter } from "./mice-adapter-types";

export const stringMiceAdapter: MiceAdapter<string> = {
  toMice: convertPrimitiveTypeToMice,
  fromMice: (value) => value,
  fromInit: convertPrimitiveTypeToMice,
}