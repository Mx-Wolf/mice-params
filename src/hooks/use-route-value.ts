import { generatePath, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { MiceAdapter } from "./mice-adapter-types";

type RouteHook = <V, T extends Record<string, string> = Record<string, string>>(name: keyof T, adapter: MiceAdapter<V>) => [value: V | null | undefined, setValue: (value: V | null | undefined) => void];

export const useRouteValue: RouteHook = <V, T extends Record<string, string> = Record<string, string>>(
  name: keyof T,
  adapter: MiceAdapter<V>
): [
    value: V | null | undefined,
    setValue: (value: V | null | undefined) => void
  ] => {
  const { toMice, fromMice } = adapter;
  const { [name]: value, ...other } = useParams<T>();

  const location = useLocation<T>();
  const match = useRouteMatch();
  const history = useHistory();
  const setValue = (nv: string | null | undefined) => {
    const np = typeof nv === "undefined" || nv === null ? other : { ...other, [name]: nv };
    const pathname = generatePath(match.path, np);
    const nloc = { ...location, pathname };
    history.push(nloc);
  };
  return [fromMice(value as unknown as string), (value: V | null | undefined) => setValue(toMice(value))];
}