import { ElementType } from "react";

export interface SmartSegmentProps{
  rejectedComponent:ElementType<{reason?:string|undefined}>;
  waitingComponent:ElementType;
}