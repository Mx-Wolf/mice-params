import { stringMiceAdapter } from "./mice-adapter-string"

describe("Поведение адаптера строки",()=>{
  it("принимает null", ()=>{
    expect(stringMiceAdapter.fromInit(null)).toBeNull();
  });
  it("принимает число", ()=>{
    expect(stringMiceAdapter.fromInit(42)).toBe("42");
  })
})