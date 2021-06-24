import { FromMice, MiceAdapter, ToMice } from "./mice-adapter-types";
import { act, renderHook } from "@testing-library/react-hooks";
import { useAdaptedSearchParam } from "./use-adapter-search-param";
import { MemoryRouter, Router } from "react-router";
import { SpecialEscapedStrings } from "../consts/special-escaped-strings";
import { createMemoryHistory } from "history";

beforeEach(() => jest.clearAllMocks());

describe("поведение алгоритма хранения состояния контрола в строке запроса", () => {
  const name = "k";
  const init = "i";
  const val = "v";
  const fm = jest.fn((v: string) => v);
  const tm = jest.fn((v: string) => v);
  const im = jest.fn((v: string) => v);
  const adapter: MiceAdapter<string> = {
    fromMice: fm as FromMice<string>,
    toMice: tm as ToMice<string>,
    fromInit: im as MiceAdapter<string>["fromInit"]
  };

  describe("когда имя параметра присутствует в строке запроса", () => {
    it("использует то, что получил", () => {
      const result = renderHook(() => useAdaptedSearchParam(name, init, adapter), {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={[`/test?${name}=${val}`]}>
            {children}
          </MemoryRouter>
        ),
      });
      const [value] = result.result.current;
      expect(value).toBe(val);
    });
    it("преобразует полученные данные для специальных значений", () => {
      const result = renderHook(() => useAdaptedSearchParam(name, init, adapter), {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={[`/test?${name}=${SpecialEscapedStrings.undefined}`]}>
            {children}
          </MemoryRouter>
        ),
      });
      const [value] = result.result.current;
      expect(value).toBeUndefined()
    });
    it("предоставляет новое значение", async () => {
      const newValue = `${val}-new`;
      const result = renderHook(() => useAdaptedSearchParam(name, init, adapter), {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={[`/test?${name}=${val}`]}>
            {children}
          </MemoryRouter>
        )
      });
      const [, setValue] = result.result.current;
      await act(() => Promise.resolve(setValue(newValue)));
      expect(result.result.current[0]).toBe(newValue);
    });
    it("сохраняет значение при смене других параметров", async () => {
      const newValue = `${val}-new`;
      const history = createMemoryHistory();
      history.push(`/test?${name}=${val}`);
      const result = renderHook(() => useAdaptedSearchParam(name, init, adapter), {
        wrapper: ({ children }) => (
          <Router history={history}>
            {children}
          </Router>
        )
      });
      const [, setValue] = result.result.current;
      await act(() => Promise.resolve(setValue(newValue)));
      expect(result.result.current[0]).toBe(newValue);
      await act(() => Promise.resolve(history.push(`/test?${name}=${newValue}&other=ov`)));
      expect(result.result.current[0]).toBe(newValue);
    })

  })
})