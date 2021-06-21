import { useEffect } from "react";
import { useLocation, useParams } from "react-router";

type Action = ((vals: Record<string, string>) => void) | (() => () => void);
type DepComp = (names: string[], query: URLSearchParams, params: Record<string, string | undefined>) => readonly string[];
type LocationEffectHook = (action: Action, names: string[]) => void;

const emptyDeps: readonly string[] = Object.freeze([]);

export const computeDependencies: DepComp = (names, s, p) => {
  if (!Array.isArray(names) || names.length <= 0) {
    return emptyDeps;
  }
  const ln = [...new Set(names)].sort();
  const candidat = ln.map((name) => {
    if (!name) {
      return emptyDeps;
    }
    const v = s.get(name) || p[name];
    if (!v) {
      return emptyDeps;
    }
    return [name, v];
  }).filter((e) => e !== emptyDeps);
  if (candidat.length <= 0) {
    return emptyDeps;
  }
  return candidat.flatMap((e) => e);
}

const collectPairsToObject = (deps: readonly string[]): Record<string, string> => {
  const p: Record<string, string> = {};
  for (let ix = 0; ix < deps.length / 2; ++ix) {
    p[deps[2 * ix]] = deps[1 + 2 * ix];
  }
  return p;
}

export const useLocationEffect: LocationEffectHook = (action, locationNames) => {
  const deps = computeDependencies(
    locationNames,
    new URLSearchParams(useLocation<Record<string, string>>().search),
    useParams<Record<string, string>>(),
  );
  useEffect(
    () => action(collectPairsToObject(deps)),
    deps,
  );
}