import { SpecialEscapedStrings } from "../consts/special-escaped-strings";
import { urlToString } from "./url-to-string";

describe("правила извлечения значения из строки запроса",()=>{
  it("возвращает обычную строку как есть", ()=>{
    const value = "1";
    const result = urlToString(value);
    expect(result).toBe(value);
  });
  it("возвращает null для специальной последовательности", ()=>{
    const result = urlToString(SpecialEscapedStrings.null);
    expect(result).toBeNull();
  });
  it("возвращает undefined для специальной постледовательности", ()=>{
    expect(urlToString(SpecialEscapedStrings.undefined)).toBeUndefined();
  });
  
})