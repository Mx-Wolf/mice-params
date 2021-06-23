import { useHistory } from "react-router-dom"
import { stringToUrl } from "../utils/string-to-url";
import { Relaxed } from "./type-defs";
type History = ReturnType<typeof useHistory>;
type Setter = (value: string | null | undefined) => void;
type SetterFactory = (name: string) => Setter;

const pull: Map<History, SetterFactory> = new Map<History, SetterFactory>();

export const replaceHistoryParam = (history: History, name: string, value: Relaxed<string>): void => {
  const newValue = stringToUrl(value);
  const params = new URLSearchParams(history.location.search);
  const curValue = params.get(name);
  if (curValue === newValue) {
    return;
  }
  params.set(name, newValue);
  params.sort();
  history.replace({ ...history.location, search: params.toString() });
}

const createSetterInternal = (history: History, name: string): Setter => {
  return (value: string | null | undefined) => {
    replaceHistoryParam(history, name, value);
  }
}
const createSetterFactory = (history: History) => {
  const setters: Map<string, Setter> = new Map<string, Setter>();
  return (name: string) => {
    const rv = setters.get(name);
    if (typeof rv !== "undefined") {
      return rv;
    }
    const nv = createSetterInternal(history, name);
    setters.set(name, nv);
    return nv;
  }
}
const getOrCreateSetters = (p: Map<History, SetterFactory>, k: History): SetterFactory => {
  const rv = p.get(k);
  if (typeof rv !== "undefined") {
    return rv;
  }
  const nv = createSetterFactory(k)
  p.set(k, nv);
  return nv;
}
export const createSetter = (history: History, name: string): Setter => {
  const setters = getOrCreateSetters(pull, history);
  const rv = setters(name);
  return rv;
}
