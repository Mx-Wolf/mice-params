import { computeDependencies } from "./use-location-effect";

describe("правило отбора зависимостей", () => {
  it("допускает использование пустого массива", () => {
    const names: string[] = [];
    const params = {};
    const query = new URLSearchParams();
    const result = computeDependencies(names, query, params);
    expect(result.length).toBe(0);
  });
  it("придает приоритет строке запроса", () => {
    const nameConflict = "variable-name";
    const loPriorityValue = "42";
    const hiPriorityValue = "73";
    const names: string[] = [nameConflict];
    const params = { [nameConflict]: loPriorityValue };
    const query = new URLSearchParams();
    query.set(nameConflict, hiPriorityValue);
    const result = computeDependencies(names, query, params);
    expect(result[0]).toBe(nameConflict);
    expect(result[1]).toBe(hiPriorityValue);
  });
  it("использует алфавитный порядок нечетных слов", () => {
    const names = ["b", "a"];
    const params = { a: "942" };
    const query = new URLSearchParams();
    query.set("b", "73");
    const result = computeDependencies(names, query, params);
    expect(result[0]).toBe("a");
    expect(result[2]).toBe("b");
  });
  it("игнорирует пустые значения", () => {
    const names = ["a", "b"];
    const params = { a: undefined };
    const query = new URLSearchParams();
    const result = computeDependencies(names, query, params);
    expect(result.length).toBe(0);
  });
  it("игнорирует пустые имена", () => {
    const names = ["", ""];
    const params = { "": "42" };
    const query = new URLSearchParams()
    query.set("", "73");
    const result = computeDependencies(names, query, params);
    expect(result.length).toBe(0);
  });
  it("игнорирует дублирование имен", () => {
    const names = ["duble", "duble"];
    const params = { "duble": "42" };
    const query = new URLSearchParams("duble=73");
    const result = computeDependencies(names, query, params);
    expect(result.length).toBe(2);
    expect(result[1]).toBe("73");
  });
  describe("Для массива пустых имен", () => {
    it("возвращает один и тот же пустой массив", () => {
      const names1 = ["", ""];
      const names2 = ["", "", ""];
      const params = {};
      const query = new URLSearchParams();
      const r1 = computeDependencies(names1, query, params);
      const r2 = computeDependencies(names2, query, params);
      expect(r1).toBe(r2);
    });
  });
  describe("Для массива имен с отсутствющими значениями", () => {
    it("возвращает один и тот же пустой массив", () => {
      const names1 = ["a", "b"];
      const names2 = ["a", "b", "c"];
      const query = new URLSearchParams();
      const params = {};
      const r1 = computeDependencies(names1, query, params);
      const r2 = computeDependencies(names2, query, params);
      expect(r1).toBe(r2);
    })
  })
  it("читает строку парами", () => {
    const query = new URLSearchParams("?bop=2021-04-16&bopDisabled=1&dateBal=2021-04-30&eop=2021-04-17");
    const names = ["bop", "bopDisabled", "dateBal", "eop"];
    const result = computeDependencies(names, query, {});
    expect(result.length % 2).toBe(0);
  });
  describe("для пустого массива имен", () => {
    it("возвращает один и тот же пустой массив", () => {
      const names: string[] = [];
      const names2: string[] = [];
      const params = {};
      const query = new URLSearchParams();
      const r1 = computeDependencies(names, query, params);
      const r2 = computeDependencies(names2, query, params);
      expect(r1).toBe(r2);
    });
  });
});