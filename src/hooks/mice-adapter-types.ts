export type ToMice<T> = (value: T | undefined) => string | undefined;
export type FromMice<T> = (value: string | undefined) => T | undefined;
export interface MiceAdapter<T>{
  toMice:ToMice<T>;
  fromMice:FromMice<T>;
}