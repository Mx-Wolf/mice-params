import { SegmentOptions } from "../components/segment-options";

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
type SmartSegmentHook = (options:SegmentOptions)=>SegmentResult;
export const useSmartSegment:SmartSegmentHook = () => {
  return <SmartSegmentWaiting>({
    type: "waiting"
  });
}