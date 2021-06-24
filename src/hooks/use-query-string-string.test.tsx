import { renderHook } from "@testing-library/react-hooks";
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
  })
})