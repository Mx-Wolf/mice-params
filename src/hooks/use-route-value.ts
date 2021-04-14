import { generatePath, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { MiceAdapter } from "./mice-adapter-types";

type RouteHook = <T extends Record<string, string> = Record<string, string>>(name: keyof T, adapter: MiceAdapter<T>) => [value: T | undefined, setValue: (value: T | undefined) => void];

export const useRouteValue: RouteHook = <T extends Record<string, string> = Record<string, string>>(
  name: keyof T,
  adapter: MiceAdapter<T>
): [
    value: T | undefined,
    setValue: (value: T | undefined) => void
  ] => {
  const { toMice, fromMice } = adapter;
  const { [name]: value, ...other } = useParams<T>();

  const location = useLocation<T>();
  const match = useRouteMatch();
  const history = useHistory();
  const setValue = (nv: string | undefined) => {
    const np = typeof nv === "undefined" ? other : { ...other, [name]: nv };
    const pathname = generatePath(match.path, np);
    const nloc = { ...location, pathname };
    history.push(nloc);
  };
  return [fromMice(value as unknown as string), (value: T | undefined) => setValue(toMice(value))];
}