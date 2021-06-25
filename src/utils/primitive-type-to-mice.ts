import { PrimitiveType, Relaxed } from "../hooks/type-defs";

const nf = new Intl.NumberFormat("en-US", {
  useGrouping: false,
  maximumFractionDigits: 20,
  minimumFractionDigits: 0,
});

const lz = (v: number) => v >= 10 ? v.toString() : `0${v}`;

export const convertPrimitiveTypeToMice = (value: Relaxed<PrimitiveType>): Relaxed<string> => {
  if (typeof value === "undefined") { return undefined; }
  if (value === null) { return null; }
  if(value instanceof Date){ return `${value.getFullYear()}-${lz(+1 + value.getMonth())}-${lz(value.getDate())}`}
  if (typeof value === "string") { return value; }
  if (typeof value === "boolean") { return value ? "1" : "0"; }
  if (typeof value === "number") { return nf.format(value); }

  return undefined;
}