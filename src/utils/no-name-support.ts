import { Relaxed } from "../hooks/type-defs";

export const EMPTY_NAME_TO_SWITCH_OFF = "";
export const noop = Function.prototype as <T>(value: Relaxed<T>) => void;