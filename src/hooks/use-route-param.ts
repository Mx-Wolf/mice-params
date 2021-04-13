import { generatePath, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { MiceAdapter } from "./mice-adapter-types";

export const useRouteParam = <T extends Record<string, string> = Record<string, string>>(name: string, adapter: MiceAdapter<T>) => {
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
  return [fromMice(value as unknown as string), (value: T) => setValue(toMice(value))];
}