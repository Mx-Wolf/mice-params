import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { computeFirstStateValue } from "./compute-first-state-value";
import { replaceHistoryParam } from "./create-set-value-on-query";
import { getHistoryParam } from "./get-history-param";
import { MiceAdapter } from "./mice-adapter-types";
import { Relaxed } from "./type-defs";

export const useAdaptedSearchParam = <T>(
  name: string,
  initialValue: T | null | undefined,
  adapter: MiceAdapter<T>,
): readonly [Relaxed<T>, (value: Relaxed<T>) => void] => {

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
    (value: Relaxed<T>) => replaceHistoryParam(
      history,
      name,
      adapter.toMice(value),
    ),
    [name, adapter, history],
  );
  return [adapter.fromMice(stateValue), setValue] as const;
}
