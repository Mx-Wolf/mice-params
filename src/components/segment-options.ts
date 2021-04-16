import { ElementType } from "react";

export interface SegmentOptions {
  name: string;
  restoreValue?: (name: string) => Promise<string>;
  authorize?: ((name: string, value: string) => Promise<boolean>) | undefined;
  next?: SegmentOptions | undefined;
  component?: ElementType | undefined;
}