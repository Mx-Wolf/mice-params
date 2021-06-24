import { numberMiceAdapter } from "..";
import { boolMiceAdapter } from "./mice-adapter-bool";
import { dateMiceAdapter } from "./mice-adapter-date";
import { moneyMiceAdapter } from "./mice-adapter-money";
import { stringMiceAdapter } from "./mice-adapter-string";
import { QueryStringBinding, Relaxed } from "./type-defs";
import { useAdaptedSearchParam } from "./use-adapter-search-param";

export const useBoolean = (
  name: string,
  initialValue?: string | Relaxed<boolean>,
): QueryStringBinding<boolean> => {
  const iv = typeof initialValue === "string" ? boolMiceAdapter.fromMice(initialValue) : initialValue;
  return useAdaptedSearchParam(name, iv, boolMiceAdapter)
};
export const useDate = (
  name: string,
  initialValue?: string | Relaxed<Date>,
): QueryStringBinding<Date> => {
  const iv = typeof initialValue === "string" ? dateMiceAdapter.fromMice(initialValue) : initialValue;
  return useAdaptedSearchParam(
    name,
    iv,
    dateMiceAdapter,
  )
};
export const useNumber = (
  name: string,
  initialValue?: string | Relaxed<number>,
): QueryStringBinding<number> => {
  const iv = typeof initialValue === "string" ? numberMiceAdapter.fromMice(initialValue) : initialValue;
  return useAdaptedSearchParam(
    name,
    iv,
    numberMiceAdapter,
  )
};
export const useMoney = (
  name: string,
  initialValue?: string | Relaxed<number>,
): QueryStringBinding<number> => {
  const iv = typeof initialValue === "string" ? moneyMiceAdapter.fromMice(initialValue) : initialValue;
  return useAdaptedSearchParam(
    name,
    iv,
    moneyMiceAdapter,
  )
};
export const useString = (
  name: string,
  initialValue?: Relaxed<string>,
): QueryStringBinding<string> => {
  return useAdaptedSearchParam(
    name,
    initialValue,
    stringMiceAdapter,
  )
};
