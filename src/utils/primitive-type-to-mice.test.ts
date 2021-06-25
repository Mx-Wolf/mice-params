import { convertPrimitiveTypeToMice } from "./primitive-type-to-mice";

describe("Преобразование из значений к спец строке для строки запроса",()=>{
  it("Готов для работы с датой",()=>{
    const dt = new Date();
    const st = convertPrimitiveTypeToMice(dt);
    expect(st).toBeDefined();
    expect(st?.length).toBe(10);
  })
})