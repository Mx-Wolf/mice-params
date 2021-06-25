export type Relaxed<T> = T | null | undefined;
export type PrimitiveType = boolean | number | string | Date;
export type QueryStringBinding<T> = readonly [Relaxed<T>, (value: Relaxed<PrimitiveType>) => void]
export type QueryStringBindingHook<T> = (name: string, initialValue: Relaxed<PrimitiveType>) => QueryStringBinding<T>
export interface CreateFactoryResult {
  useBoolean: QueryStringBindingHook<boolean>;
  useDate: QueryStringBindingHook<Date>;
  useNumber: QueryStringBindingHook<number>;
  useString: QueryStringBindingHook<string>;
}