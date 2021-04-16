export type ToMice<T> = (value: T | null | undefined) => string | null | undefined;
export type FromMice<T> = (value: string | null | undefined) => T | null | undefined;
export interface MiceAdapter<T> {
  toMice: ToMice<T>;
  fromMice: FromMice<T>;
}