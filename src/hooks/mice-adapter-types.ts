import { Relaxed } from "./type-defs";

export type ToMice<T> = (value:Relaxed<T>) => Relaxed<string>;
export type FromMice<T> = (value: Relaxed<string>) => Relaxed<T>;

export type InitValueType = boolean | number | string | null | undefined;

export interface MiceAdapter<T> {
  toMice: ToMice<T>;
  fromMice: FromMice<T>;
  fromInit: (value:InitValueType)=>Relaxed<T>
}