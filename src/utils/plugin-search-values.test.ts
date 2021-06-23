import { SpecialEscapedStrings } from "../consts/special-escaped-strings";
import { pluginSearchValues } from "./plugin-search-values";

describe("получение текущих значений для списка имен", () => {
  it("использует значение, если оно есть", () => {
    const result = pluginSearchValues("a=b", ["a"]);
    expect(result["a"]).toBe("b");
  });
  it("Проверяет отсутствие списка параметров",()=>{
    const result = pluginSearchValues("a=b");
    expect(Object.keys(result).length).toBe(0);
  })
  describe("для специальных значений", () => {
    it("не берет спец. строку undefined", () => {
      const result = pluginSearchValues(`a=${SpecialEscapedStrings.undefined}`, ["a"]);
      expect("a" in result).toBeFalsy();
    });
    it("не берет спец. строку null",()=>{
      const result = pluginSearchValues(`a=${SpecialEscapedStrings.null}`, ["a"]);
      expect("a" in result).toBeFalsy();
    });
    it("берет. строку empty",()=>{
      const result = pluginSearchValues(`a=`, ["a"]);
      expect("a" in result).toBeTruthy();
    });    
  });

});