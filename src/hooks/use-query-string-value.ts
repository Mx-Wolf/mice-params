import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { MiceAdapter } from "./mice-adapter-types";

export type UriHook = <T>(name: string, adapter: MiceAdapter<T>, value: T | null | undefined) => [value: T | null | undefined, setValue: (value: T | null | undefined) => void];

const setValueImp = (
  name: string,
  history: ReturnType<typeof useHistory>,
  setIv: (nv: string | undefined) => void,
  nv: string | null | undefined,
) => {
  const nextqs = new URLSearchParams(history.location.search);
  if (typeof nv === "undefined" || nv === null) {
    nextqs.delete(name);
    setIv(undefined);
  } else {
    nextqs.set(name, nv);
    setIv(nv);
  }
  nextqs.sort();
  history.replace({ ...history.location, search: nextqs.toString() });

};

export const useQueryStringValue: UriHook = <T>(name: string, adapter: MiceAdapter<T>, initialValue: T | null | undefined = undefined) => {
  const { fromMice, toMice } = adapter;
  const miceInitialValue = toMice(initialValue);
  const [iv, setIv] = useState(miceInitialValue);

  const value = new URLSearchParams(useLocation().search).get(name) || undefined;

  const history = useHistory();
  const setValue = useCallback(
    (nv) => setValueImp(name, history, setIv, nv),
    [history, name, setIv],
  );
  const needUpdate = !value && !!iv;
  const result = needUpdate ? iv : value;
  useEffect(() => {
    if (needUpdate) {
      setValue(result);
    }
  }, [needUpdate, result])
  return [fromMice(result), (value: T | null | undefined) => setValue(toMice(value))];
}