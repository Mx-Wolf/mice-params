import { act, renderHook } from "@testing-library/react-hooks";
import { createMemoryHistory } from "history";
import {Router} from "react-router-dom";
import { useString } from "./use-query-string-value";
describe("поведение крючка строки на строке запроса", () => {
  it("принимает null", () => {
    const history = createMemoryHistory();
    renderHook(()=>useString("test",null),{
      wrapper:({children})=>(<Router history={history}>
        {children}
      </Router>)
    });
    expect(history.location.search).toBe("?test=%25u2400");
  });
  it("принимает число", () => {
    const history = createMemoryHistory();
    renderHook(()=>useString("test", 42),{
      wrapper:({children})=>(<Router history={history}>{children}</Router>)
    });
    expect(history.location.search).toBe("?test=42");
  });
  it("ставит число",()=>{
    const history = createMemoryHistory();
    const cp = renderHook(()=>useString("test", 42),{
      wrapper:({children})=>(<Router history={history}>{children}</Router>)
    });
    act(()=>{
      cp.result.current[1](73);
    });
    expect(history.location.search).toBe("?test=73");    
  })
})