import { useEffect } from "react";
import { useLocation, useParams } from "react-router";

type Action = ((vals: Record<string, string>) => void) | (() => () => void);
type DepComp = (names: string[], query: URLSearchParams, params: Record<string, string | undefined>) => string[];
type LocationEffectHook = (action: Action, names: string[]) => void;

export const computeDependencies: DepComp = (names, s, p) => {
  const ln = [...new Set(names)].sort();
  return ln.flatMap((name) => {
    if (!name) {
      return [];
    }
    const v = s.get(name) || p[name];
    if (!v) {
      return [];
    }
    return [name, v];
  }).filter((e) => !!e);
}

export const useLocationEffect: LocationEffectHook = (action, locationNames) => {
  const deps = computeDependencies(
    locationNames,
    new URLSearchParams(useLocation<Record<string, string>>().search),
    useParams<Record<string, string>>(),
  );
  useEffect(() => {
    const p: Record<string, string> = {};
    for (let ix = 0; ix < deps.length / 2; ++ix) {
      p[deps[2*ix]] = deps[1 + 2*ix];
    }
    return action(p);
  },
    deps,
  );
}