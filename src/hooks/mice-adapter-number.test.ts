import { numberMiceAdapter } from "./mice-adapter-number"

describe("адаптер для целого числа", () => {
  it("null пропускает как есть", () => {
    const result = numberMiceAdapter.fromMice(null);
    expect(result).toBeNull();
  });
  it("пропускает undefined как есть", () => {
    const result = numberMiceAdapter.fromMice(undefined);
    expect(result).toBeUndefined();
  });
  describe("Когда не удалось распарсить строку", () => {
    it("считает значение undefined", () => {
      const result = numberMiceAdapter.fromMice("not a number");
      expect(result).toBeUndefined()
    });
  });
  describe("Когда значение удалось распарсить", () => {
    it("не обращает внимание на потерю точности", () => {
      const temp = numberMiceAdapter.fromMice("0.012345678901234567890");
      const result = numberMiceAdapter.toMice(temp);
      expect(result).toBe("0.012345678901234568");
    })
  });
  describe("Когда преобразует в строку",()=>{
    it("оставляет столько цифр сколько может",()=>{
      const result = numberMiceAdapter.toMice(0.012345678901234567890123456789);
      expect(result).toBe("0.012345678901234568");
    });
    it("не использует разделитель тысяч",()=>{
      const result = numberMiceAdapter.toMice(4200);
      expect(result).toBe("4200");
    });
    it("не печатает нули после разделителя цесятичного",()=>{
      const result = numberMiceAdapter.toMice(42.00);
      expect(result).toBe("42");
    })
  })
})