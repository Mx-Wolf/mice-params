import { boolMiceAdapter } from "./mice-adapter-bool"

describe("поведение адаптера для флагов", () => {
  it("для undefined возвращает undefined", () => {
    expect(boolMiceAdapter.fromMice(undefined)).toBeUndefined();
  });
  it("для null возвращает null",()=>{
    expect(boolMiceAdapter.fromMice(null)).toBeNull();
  })
  it("для слова false возвращает false", () => {
    expect(boolMiceAdapter.fromMice("false")).toBe(false);
  });
  it("для слова 0 возвращает true", () => {
    expect(boolMiceAdapter.fromMice("0")).toBe(false);
  });
  it("преобразует true в слово 1", () => {
    expect(boolMiceAdapter.toMice(true)).toBe("1");
  });
  it("преобразует false в неопределенное значение", () => {
    expect(boolMiceAdapter.toMice(false)).toBe("0");
  });
  it("не преобразует undefined в строку, оставляет undefined",()=>{
    expect(boolMiceAdapter.toMice(undefined)).toBeUndefined();
  });
  it("не преобразует null в строку. оставляет null", ()=>{
    expect(boolMiceAdapter.toMice(null)).toBeNull();
  });
  it("преобразует непонятную строку в true",()=>{
    expect(boolMiceAdapter.fromMice("foo-bar")).toBe(true);
  });
  it("преобразует пустую строку в false",()=>{
    expect(boolMiceAdapter.fromMice("")).toBe(false);
  })
})