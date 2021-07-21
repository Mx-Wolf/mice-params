import { noop } from "../utils/no-name-support"
import { MiceAdapter } from "./mice-adapter-types"
import { useAdaptedSearchParam } from "./use-adapter-search-param"
const testMiceAdapter: MiceAdapter<number> = {
  fromInit: () => 73,
  fromMice: () => 74,
  toMice: () => "",
}

describe("поведение адаптера значения строки", () => {
  describe("При отсутствии имени параметра", () => {
    it("возвращает начальное значение, преобразованное адаптером", () => {
      const [r] = useAdaptedSearchParam("", 42, testMiceAdapter);
      expect(r).toBe(73);
    });
    it ("использует design pattern null. возвращает ссылку на noop",()=>{
      const [,fn] = useAdaptedSearchParam("",42,testMiceAdapter);
      expect(fn).toBe(noop);
    })
  })
})