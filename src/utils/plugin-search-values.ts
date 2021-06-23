import { urlToString } from "./url-to-string";
const noparams: Record<string, string> = Object.freeze({});
export const pluginSearchValues = (
  search: string, 
  names: string[] | undefined = undefined): Record<string, string> => {
  if (!Array.isArray(names)) {
    return noparams;
  }
  const p = new URLSearchParams(search);
  return names.reduce((a, b) => {
    if (p.has(b)) {
      const v = urlToString(p.get(b));
      if (typeof v === "string") {
        a[b] = v;
      }
    }
    return a;
  }, {} as Record<string, string>);
}