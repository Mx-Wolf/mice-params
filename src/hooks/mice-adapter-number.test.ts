import { moneyMiceAdapter } from "./mice-adapter-money";

describe("преобразование денег для майса", () => {
  it("возвращает undefined для невнятной строки", () => { 
    const t = "not a number";
    const r = moneyMiceAdapter.fromMice(t);
    expect(r).toBeUndefined();
  });
  it("создает стрку с двумя знаками после запятой",()=>{
    const r = moneyMiceAdapter.toMice(0);
    expect(r).toBe("0.00");
  })
});