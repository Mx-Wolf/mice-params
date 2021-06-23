import { SpecialEscapedStrings } from "../consts/special-escaped-strings";

export const urlToString = (found: string | null): string | null | undefined => {
  switch (found) {
    case SpecialEscapedStrings.null: return null;
    case SpecialEscapedStrings.undefined: return undefined;
    default: return found;
  }
}
