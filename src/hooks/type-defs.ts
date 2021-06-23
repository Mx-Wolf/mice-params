export type Relaxed<T> = T | null | undefined;
export type QueryStringBinding<T> = readonly [Relaxed<T>, (value: Relaxed<T>) => void]
export type QueryStringBindingHook<T> = (name: string, initialValue: Relaxed<T>) => QueryStringBinding<T>
export interface CreateFactoryResult {
  useBoolean: QueryStringBindingHook<boolean>;
  useDate: QueryStringBindingHook<Date>;
  useNumber: QueryStringBindingHook<number>;
  useString: QueryStringBindingHook<string>;
}