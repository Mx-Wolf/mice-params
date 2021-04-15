import { ElementType } from "react";

export interface SegmentOptions {
  name: string;
  restoreValue?: () => Promise<string>;
  roles?: string[] | undefined;
  next?: SegmentOptions | undefined;
  component?: ElementType | undefined;
}