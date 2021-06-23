import { useHistory } from "react-router-dom"
import { stringToUrl } from "../utils/string-to-url";
import { Relaxed } from "./type-defs";
type History = ReturnType<typeof useHistory>;

export const replaceHistoryParam = (
  history: History,
  name: string,
  value: Relaxed<string>,
): void => {
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
