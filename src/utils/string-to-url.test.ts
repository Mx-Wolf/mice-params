import { SpecialEscapedStrings } from "../consts/special-escaped-strings";
import { Relaxed } from "../hooks/type-defs";
import { stringToUrl } from "./string-to-url";

describe("правила хранения расслабленной строки в строке запроса", () => {
  it("напрямую использует значение нормальной строки", () => {
    const value = "1";
    const result = stringToUrl(value);
    expect(result).toBe(value);
  });
  it("использует супер специальное значение для строки null-ref",()=>{
    const value:Relaxed<string> = null;
    const result = stringToUrl(value);
    expect(result).toBe(SpecialEscapedStrings.null);
  });
  it("использует специальное значение для строки undefined", ()=>{
    const value:Relaxed<string> = undefined;
    const result = stringToUrl(value);
    expect(result).toBe(SpecialEscapedStrings.undefined);
  });
  it("использует специальное значение для пустой строки",()=>{
    const value:Relaxed<string> = "";
    const result = stringToUrl(value);
    expect(result).toBe("");
  });  
})