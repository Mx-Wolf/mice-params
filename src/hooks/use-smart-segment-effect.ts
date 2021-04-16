import { useEffect, useState } from "react";
import { generatePath, useHistory, useLocation, useParams, useRouteMatch } from "react-router";
import { SegmentOptions } from "../components/segment-options";

const NOT_FOUND_REASON = "not found";
const NOT_CONFIGURED = "not configure";

interface SmartSegmentResolved {
  type: "resolved";
  name: string;
  next: SegmentOptions;
}
interface SmartSegmentWaiting {
  type: "waiting";
}
interface SmartSegmentRejected {
  type: "rejected";
  reason: string;
}
interface SmartSegmentComponent {
  type: "component";
  component: Required<SegmentOptions>["component"]
}
type SegmentResult = SmartSegmentComponent
  | SmartSegmentRejected
  | SmartSegmentResolved
  | SmartSegmentWaiting;

type SmartSegmentHook = (options: SegmentOptions) => SegmentResult;
export const useSmartSegment: SmartSegmentHook = (options) => {
  const params = useParams<Record<string, string | undefined>>();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [authorization, setAuthorization] = useState(undefined as boolean | undefined);
  const [notFound, setNotFound] = useState(undefined as boolean | undefined);
  const { name, authorize, restoreValue, component, next } = options;
  const { [name]: value } = params;

  useEffect(() => {
    let allowSetState = true;
    if (typeof restoreValue === "function") {
      restoreValue(name)
        .then((restored) => {
          const pathname = generatePath(match.path, { ...params, [name]: restored });
          history.replace({ ...location, pathname });
        })
        .catch(() => {
          if (allowSetState) {
            setNotFound(true);
          }
        });
    }
    return () => {
      allowSetState = false;
    }
  }, [(typeof value === "undefined"), restoreValue]);

  useEffect(() => {
    let allowChangeState = true;
    if (typeof authorize === "function" && typeof value === "string") {
      authorize(name, value)
        .then((authResult) => {
          if (allowChangeState) {
            setAuthorization(authResult);
          }
        })
        .catch(() => {
          if (allowChangeState) {
            setAuthorization(false);
          }
        });
    }
    return () => { allowChangeState = false; }
  }, [authorize, value, name])

  if (typeof value === "undefined") {
    if (notFound) {
      return <SmartSegmentRejected>{
        type: "rejected",
        reason: NOT_FOUND_REASON,
      }
    }
    return <SmartSegmentWaiting>({
      type: "waiting"
    });
  }
  if (typeof authorize === "function") {
    if (typeof authorization === "undefined") {
      return <SmartSegmentWaiting>{
        type: "waiting",
      };
    }
    if (!authorization) {
      return <SmartSegmentRejected>{
        type: "rejected",
        reason: "access denied",
      };
    }
  }

  if (typeof next !== "undefined") {
    return <SmartSegmentResolved>{
      name,
      next,
      type: "resolved",
    };
  }
  if (typeof component !== "undefined") {
    return <SmartSegmentComponent>{
      component,
      type: "component"
    }
  }

  return <SmartSegmentRejected>{
    reason: NOT_CONFIGURED,
    type: "rejected"
  }
}