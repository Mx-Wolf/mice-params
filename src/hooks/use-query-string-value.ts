import { useHistory } from "react-router-dom";
import { boolMiceAdapter } from "./mice-adapter-bool";
import { dateMiceAdapter } from "./mice-adapter-date";
import { moneyMiceAdapter } from "./mice-adapter-money";
import { stringMiceAdapter } from "./mice-adapter-string";
import { CreateFactoryResult } from "./type-defs";
import { useAdaptedSearchParam } from "./use-adapter-search-param";



export const createFactory = (history: ReturnType<typeof useHistory>): CreateFactoryResult => {
  return {
    useBoolean: (name: string, initialValue?: boolean | null | undefined) => {
      return useAdaptedSearchParam(history, name, initialValue, boolMiceAdapter);
    },
    useDate: (name: string, initialValue?: Date | null | undefined) => {
      return useAdaptedSearchParam(history, name, initialValue, dateMiceAdapter);
    },
    useNumber: (name: string, initialValue?: number | null | undefined) => {
      return useAdaptedSearchParam(history, name, initialValue, moneyMiceAdapter);
    },
    useString: (name: string, initialValue?: string | null | undefined) => {
      return useAdaptedSearchParam(history,name, initialValue, stringMiceAdapter);
    },
  }

}
