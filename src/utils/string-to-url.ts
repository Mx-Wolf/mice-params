import { SpecialEscapedStrings } from "../consts/special-escaped-strings";

export const stringToUrl = (newValue: string | null | undefined): string => {
  if (typeof newValue === "string") {
    return newValue;
  }
  if (newValue === null) {
    return SpecialEscapedStrings.null;
  }
  return SpecialEscapedStrings.undefined;
}