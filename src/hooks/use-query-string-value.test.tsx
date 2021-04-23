import { renderHook, act, cleanup } from "@testing-library/react-hooks";
import { useQueryStringValue } from "./use-query-string-value";
import { MemoryRouter } from "react-router-dom"
import { dateMiceAdapter } from "./mice-adapter-date";

afterEach(() => cleanup());
describe("Поведение крючка на строке запроса, useQueryStringValue", () => {

  describe("Когда в строек запроса нет параметра", () => {
    it("с превого раза использует значение по умолчанию", () => {
      const initialDate = new Date(2021, 4 - 1, 22);
      const result = renderHook(() => useQueryStringValue("bop", dateMiceAdapter, initialDate), {
        wrapper: ({ children }) => (<MemoryRouter
          initialEntries={["/"]}
          initialIndex={0}>
          {children}
        </MemoryRouter>)
      });
      const first = result.result.all[0];
      const value = Array.isArray(first) ? first[0] : undefined;
      expect(value?.valueOf()).toBe(initialDate.valueOf());
    })
  });
  describe("Когда параметр в строке запроса", () => {
    it("берет значение от из элемента строки запроса", () => {
      const result = renderHook(() => useQueryStringValue("bop", dateMiceAdapter, undefined), {
        wrapper: ({ children }) => (<MemoryRouter initialEntries={["/?bop=2021-04-22"]}>
          {children}
        </MemoryRouter>)
      });
      const value = result.result.current[0];
      expect(value?.getFullYear()).toBe(2021);
      expect(value?.getMonth()).toBe(4 - 1);
      expect(value?.getDate()).toBe(22);
    });
    describe("был, но его стерли", () => {
      it("не берет начальное значение", () => {
        const initialDate = new Date(2021, 4 - 1, 22);
        const result = renderHook(() => useQueryStringValue("bop", dateMiceAdapter, initialDate), {
          wrapper: ({ children }) => (<MemoryRouter initialEntries={["/?bop-2021-04-22"]}>
            {children}
          </MemoryRouter>)
        });
        const value = result.result.current[0];
        expect(value?.getFullYear()).toBe(2021);
        expect(value?.getMonth()).toBe(4 - 1);
        expect(value?.getDate()).toBe(22);

        act(() => result.result.current[1](undefined));

        const next = result.result.current[0];
        expect(next).toBeUndefined();
      });
    })
  })
});
