import { PrimitiveType, Relaxed } from "./type-defs";

export type ToMice<T> = (value: Relaxed<T>) => Relaxed<string>;
export type FromMice<T> = (value: Relaxed<string>) => Relaxed<T>;

export type InitValueType = Relaxed<PrimitiveType>;

export interface MiceAdapter<T> {
  toMice: ToMice<PrimitiveType | T>;
  fromMice: FromMice<T>;
  fromInit: (value: InitValueType) => Relaxed<T>
}