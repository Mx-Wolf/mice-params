import { boolMiceAdapter } from "./mice-adapter-bool";
import { dateMiceAdapter } from "./mice-adapter-date";
import { moneyMiceAdapter } from "./mice-adapter-money";
import { stringMiceAdapter } from "./mice-adapter-string";
import { QueryStringBinding, Relaxed } from "./type-defs";
import { useAdaptedSearchParam } from "./use-adapter-search-param";

export const useBoolean = (
  name: string,
  initialValue?: Relaxed<boolean>,
): QueryStringBinding<boolean> => (
  useAdaptedSearchParam(name, initialValue, boolMiceAdapter)
);
export const useDate = (
  name: string,
  initialValue?: Relaxed<Date>,
): QueryStringBinding<Date> => (
  useAdaptedSearchParam(
    name,
    initialValue,
    dateMiceAdapter,
  )
);
export const useNumber = (
  name: string,
  initialValue?: Relaxed<number>,
): QueryStringBinding<number> => (
  useAdaptedSearchParam(
    name,
    initialValue,
    moneyMiceAdapter,
  )
);
export const useString = (
  name: string,
  initialValue?: Relaxed<string>,
): QueryStringBinding<string> => (
  useAdaptedSearchParam(
    name,
    initialValue,
    stringMiceAdapter,
  )
);
