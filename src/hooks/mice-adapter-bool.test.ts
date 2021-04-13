import { boolMiceAdapter } from "./mice-adapter-bool"

describe("поведение адаптера для флагов", () => {
  it("для undefined возвращает false", () => {
    expect(boolMiceAdapter.fromMice(undefined)).toBe(false);
  });
  it("для слова false возвращает true", () => {
    expect(boolMiceAdapter.fromMice("false")).toBe(true);
  });
  it("для слова 0 возвращает true", () => {
    expect(boolMiceAdapter.fromMice("0")).toBe(true);
  });
  it("преобразует true в слово 1", () => {
    expect(boolMiceAdapter.toMice(true)).toBe("1");
  });
  it("преобразует false в неопределенное значение", () => {
    expect(boolMiceAdapter.toMice(false)).toBeUndefined();
  });
})