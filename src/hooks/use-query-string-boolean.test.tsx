import { renderHook } from "@testing-library/react-hooks"
import { useBoolean } from "./use-query-string-value"
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("Поведение крука на строку запроса типа boolean", () => {
  it("получает начльную настройку в виде строки для true", () => {
    const history = createMemoryHistory();
    renderHook(() => useBoolean("flag", "true"), {
      wrapper: ({children})=>(
        <Router history={history}>
          {children}
        </Router>
      )
    });
    expect(history.location.search).toBe("?flag=1");
  });
  it("получает начльную настройку в виде строки для false", () => {
    const history = createMemoryHistory();
    renderHook(() => useBoolean("flag", "false"), {
      wrapper: ({children})=>(
        <Router history={history}>
          {children}
        </Router>
      )
    });
    expect(history.location.search).toBe("?flag=0");
  });
})