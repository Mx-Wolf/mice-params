import { computeFirstStateValue } from "./compute-first-state-value";
import { FromMice, MiceAdapter, ToMice } from "./mice-adapter-types";

beforeEach(() => jest.clearAllMocks());

describe("Привила использования начального значения привязки к строке запроса", () => {
  const fm = jest.fn((v: string) => v);
  const tm = jest.fn((v: string) => v);
  const im = jest.fn((v: string)=>v);
  const a: MiceAdapter<string> = {
    fromMice: fm as FromMice<string>,
    toMice: tm as ToMice<string>,
    fromInit: im as MiceAdapter<string>["fromInit"],
  }
  describe("Когда имя параметра присутствует в строке запроса", () => {
    const name = "a";
    const value = "v";
    const init = "i";
    const qs = `${name}=${value}`;

    it("пропускает найденное значение через адаптер туда-обратно", () => {
      const result = computeFirstStateValue(qs, name, a, init);
      expect(fm.mock.calls.length).toBe(1);
      expect(tm.mock.calls.length).toBe(1);
      expect(result).toBe(value);
    });
  });
  describe("Когда имя параметра не присутствует в запросе", () => {
    const name = "a";
    const value = "v";
    const init = "i";
    const qs = `${name + "-not"}=${value}`;
    it("использует начальное значение", () => {
      const result = computeFirstStateValue(qs, name, a, init);
      expect(fm.mock.calls.length).toBe(0);
      expect(tm.mock.calls.length).toBe(1);
      expect(result).toBe(init);
    })

  })
})