import { dateMiceAdapter } from "./mice-adapter-date";

describe("адаптер даты",()=>{
  it("использует локальные значения года, месяца и дня при формировании строки",()=>{
    const d = new Date("2021-03-20T23:00:00.000Z");
    const [year, month, date] = (dateMiceAdapter.toMice(d) as string).split("-");
    
    expect(Number(year)).toBe(d.getFullYear());
    expect(Number(month)).toBe(1+d.getMonth());
    expect(Number(date)).toBe(d.getDate());
  });
  it("Для невнятной строки возвращает undefined",()=>{
    expect(dateMiceAdapter.fromMice("not a date")).toBeUndefined();
  });
  it("делает строку в 10 букв",()=>{
    const d  =new Date(2000,1,1);
    const r =dateMiceAdapter.toMice(d);
    expect(r?.length).toBe(10);
  })
});