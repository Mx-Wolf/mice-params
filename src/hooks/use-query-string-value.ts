import { numberMiceAdapter } from "./mice-adapter-number";
import { boolMiceAdapter } from "./mice-adapter-bool";
import { dateMiceAdapter } from "./mice-adapter-date";
import { moneyMiceAdapter } from "./mice-adapter-money";
import { stringMiceAdapter } from "./mice-adapter-string";
import { QueryStringBinding, Relaxed } from "./type-defs";
import { useAdaptedSearchParam } from "./use-adapter-search-param";
import { InitValueType } from "./mice-adapter-types";


export const useBoolean = (
  name: string,
  initialValue?: InitValueType,
): QueryStringBinding<boolean> => {
  const a = boolMiceAdapter;
  return useAdaptedSearchParam(name, a.fromInit(initialValue), a)
};
export const useDate = (
  name: string,
  initialValue?: InitValueType | Relaxed<Date>,
): QueryStringBinding<Date> => {
  const a = dateMiceAdapter;
  return useAdaptedSearchParam(
    name,
    initialValue instanceof Date? initialValue: a.fromInit(initialValue), 
    a)
};
export const useNumber = (
  name: string,
  initialValue?: InitValueType,
): QueryStringBinding<number> => {
  const a = numberMiceAdapter;
  return useAdaptedSearchParam(
    name,
    a.fromInit(initialValue),
    a,
  )
};
export const useMoney = (
  name: string,
  initialValue?: string | Relaxed<number>,
): QueryStringBinding<number> => {
  const a = moneyMiceAdapter;
  return useAdaptedSearchParam(
    name,
    a.fromInit(initialValue),
    a,
  )
};
export const useString = (
  name: string,
  initialValue?: InitValueType,
): QueryStringBinding<string> => {
  const a = stringMiceAdapter;
  return useAdaptedSearchParam(
    name,
    a.fromInit(initialValue),
    a,
  )
};
