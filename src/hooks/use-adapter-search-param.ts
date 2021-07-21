import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EMPTY_NAME_TO_SWITCH_OFF, noop } from "../utils/no-name-support";
import { computeFirstStateValue } from "./compute-first-state-value";
import { replaceHistoryParam } from "./create-set-value-on-query";
import { getHistoryParam } from "./get-history-param";
import { InitValueType, MiceAdapter } from "./mice-adapter-types";
import { Relaxed } from "./type-defs";

const asPrimitive = (initialValue: unknown): InitValueType => {
  switch (typeof initialValue) {
    case "boolean": return initialValue;
    case "number": return initialValue;
    case "object": if (initialValue === null) { return null; } return `${initialValue}`;
    case "string": return initialValue;
    default: return undefined;
  }
};

export const useAdaptedSearchParam = <T>(
  name: string,
  initialValue: Relaxed<T>,
  adapter: MiceAdapter<T>,
): readonly [Relaxed<T>, (value: Relaxed<T>) => void] => {
  if (name === EMPTY_NAME_TO_SWITCH_OFF) {
    return [adapter.fromInit(asPrimitive(initialValue)), noop] as const;
  }
  const history = useHistory();

  const [stateValue, setStateValue] = useState(
    () => computeFirstStateValue(
      history.location.search,
      name,
      adapter,
      initialValue,
    ),
  );

  useEffect(() => {

    const unlisten = history.listen(
      (location) => {
        setStateValue(
          () => getHistoryParam(location.search, name),
        );
      },
    );

    replaceHistoryParam(history, name, stateValue);

    return () => { unlisten() }
  }, [name]);

  const setValue = useCallback(
    (value: Relaxed<PrimitiveType>) => replaceHistoryParam(
      history,
      name,
      adapter.toMice(value),
    ),
    [name, adapter, history],
  );
  return [adapter.fromMice(stateValue), setValue] as const;
}
