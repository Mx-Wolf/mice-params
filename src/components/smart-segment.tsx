import { FC } from "react";
import { useSmartSegment } from "../hooks/use-smart-segment-effect";
import { SegmentOptions } from "./segment-options";
import { SmartSegmentProps } from "./smart-segment-props";

export const SmartSegment: FC<SegmentOptions & SmartSegmentProps> = (p) => {
  const segment = useSmartSegment(p);
  switch (segment.type) {
    case "component": {
      const { component: Co } = segment;
      return <Co />
    }
    case "rejected": {
      const { reason } = segment;
      const { rejectedComponent: Co } = p;
      return <Co reason={reason} />
    }
    case "resolved": {
      const { next } = segment;
      const { rejectedComponent, waitingComponent } = p;
      return <SmartSegment {...next} rejectedComponent={rejectedComponent} waitingComponent={waitingComponent} />
    }
    case "waiting": {
      const {waitingComponent:Co} = p;
      return <Co />
    }
  }
  return null;
}