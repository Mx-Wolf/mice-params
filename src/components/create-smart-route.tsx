import { FC } from "react";
import { RouteProps } from "react-router";
import { SegmentOptions } from "./segment-options";
import { SmartRoute } from "./smart-route";
import { SmartSegmentProps } from "./smart-segment-props";

export const createSmartRoute = (o:SmartSegmentProps & SegmentOptions): FC<Omit<RouteProps,"component">>=>{

  const ResultSmartRoute:FC<RouteProps> = (p)=>{
    
    return <SmartRoute {...p} {...o} />
  }
  return ResultSmartRoute
}