import { FC } from "react";
import { Route, RouteProps } from "react-router";
import { SegmentOptions } from "./segment-options";
import { SmartSegment } from "./smart-segment";
import { SmartSegmentProps } from "./smart-segment-props";

export const SmartRoute:FC<Omit<RouteProps,"component"> & SmartSegmentProps & SegmentOptions> = (p)=>{
  const {waitingComponent,rejectedComponent,name,authorize,component,next,restoreValue,...other} = p
  return <Route {...other}>
    <SmartSegment {...{waitingComponent, restoreValue, next, name, component, authorize, rejectedComponent}} />
  </Route>
}