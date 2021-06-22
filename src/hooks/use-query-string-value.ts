import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { boolMiceAdapter } from "./mice-adapter-bool";
import { dateMiceAdapter } from "./mice-adapter-date";
import { moneyMiceAdapter } from "./mice-adapter-money";
import { stringMiceAdapter } from "./mice-adapter-string";
import { MiceAdapter } from "./mice-adapter-types";



export type UriHook = <T>(name: string, adapter: MiceAdapter<T>, value: T | null | undefined) => [value: T | null | undefined, setValue: (value: T | null | undefined) => void];

const SpecialEscapedStrings = {
  "null": "%u2400",
  "undefined": "%u2408",
  "empty": "%2403",
};

const stringToUrl = (newValue: string | null | undefined): string => {
  if (typeof newValue === "string") {
    if (newValue === "") {
      return SpecialEscapedStrings.empty;
    }
    return newValue;
  }
  if (newValue === null) {
    return SpecialEscapedStrings.null;
  }
  return SpecialEscapedStrings.undefined;
}
const urlToString = (found: string | null): string | null | undefined => {
  switch (found) {
    case SpecialEscapedStrings.empty: return "";
    case SpecialEscapedStrings.null: return null;
    case SpecialEscapedStrings.undefined: return undefined;
    default: return found;
  }
}
type Relaxed<T> = T | null | undefined;
type QueryStringBinding<T> = readonly [Relaxed<T>, (value: Relaxed<T>) => void]
type QueryStringBindingHook<T> = (name: string, initialValue: Relaxed<T>) => QueryStringBinding<T>
interface CreateFactoryResult {
  useBoolean: QueryStringBindingHook<boolean>;
  useDate: QueryStringBindingHook<Date>;
  useNumber: QueryStringBindingHook<number>;
  useString: QueryStringBindingHook<string>;
}
export const createFactory = (history: ReturnType<typeof useHistory>): CreateFactoryResult => {
  const createSetValue = (name: string) => {
    return (valueGiven: string | null | undefined) => {
      const newValue = stringToUrl(valueGiven);
      const params = new URLSearchParams(history.location.search);
      const curValue = params.get(name);
      if (curValue === newValue) {
        return;
      }
      params.set(name, newValue);
      params.sort();
      history.replace({ ...history.location, search: params.toString() });
    }
  }
  const useQueryStringParam = (name: string, initialValue: string | null | undefined) => {
    const setValue = useMemo(
      () => createSetValue(name),
      [name],
    );
    const [stateValue, setStateValue] = useState<string | null | undefined>(() => {
      const firstParams = new URLSearchParams(history.location.search);      
      return firstParams.has(name) ? firstParams.get(name) : initialValue;
    });
    useEffect(() => {
      let trackValue = stateValue;
      const unlisten = history.listen((state) => {
        const { search } = state;
        const params = new URLSearchParams(search);
        const value = urlToString(params.get(name));
        if (value !== trackValue) {
          trackValue = value;
          setStateValue(value)
        }
      })
      return () => { unlisten() }
    }, [name]);
    return [stateValue, setValue] as const;
  }
  const imp = <T>(name: string, initialValue: T | null | undefined, a: MiceAdapter<T>) => {
    const iv = a.toMice(initialValue);
    const [miceValue, setMiceValue] = useQueryStringParam(name, iv);
    const setValue = useCallback((value: ReturnType<typeof a["fromMice"]>) => setMiceValue(a.toMice(value)), [name]);
    return [a.fromMice(miceValue), setValue] as const;
  }
  return {
    useBoolean: (name: string, initialValue?: boolean | null | undefined) => {
      return imp(name, initialValue, boolMiceAdapter);
    },
    useDate: (name: string, initialValue?: Date | null | undefined) => {
      return imp(name, initialValue, dateMiceAdapter);
    },
    useNumber: (name: string, initialValue?: number | null | undefined) => {
      return imp(name, initialValue, moneyMiceAdapter);
    },
    useString: (name: string, initialValue?: string | null | undefined) => {
      return imp(name, initialValue, stringMiceAdapter);
    },
  }

}


// export const useQueryStringValue: UriHook = <T>(name: string, adapter: MiceAdapter<T>, initialValue: T | null | undefined = undefined) => {
//   const { fromMice, toMice } = adapter;
//   const [iv, setIv] = useState(toMice(initialValue));
//   const history = useHistory();
//   const originalqs = new URLSearchParams(history.location.search);
//   const value: string | null | undefined = originalqs.get(name) || undefined;
//   const setValue: (value: string | null | undefined) => void = useCallback((nv) => {
//     const nextqs = new URLSearchParams(history.location.search);
//     if (typeof nv === "undefined") {
//       nextqs.set(name, SpecialEscapedStrings.undefined);
//     }
//     if (typeof nv === "undefined" || nv === null) {
//       nextqs.delete(name);
//       setIv(undefined);
//     } else {
//       nextqs.set(name, nv);
//       setIv(nv);
//     }
//     nextqs.sort();
//     history.replace({ ...history.location, search: nextqs.toString() });
//   }, [history, name]);
//   useEffect(() => {
//     if (!value && !!iv) {
//       setValue(iv);
//     }
//   }, [!iv, setValue, !value])
//   return [fromMice(value), (value: T | null | undefined) => setValue(toMice(value))];
// }