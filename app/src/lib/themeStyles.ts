import type { ThemeFamilyId } from "./theme";
import nbiTheme from "style-guide/css/nbi/nbi-theme.css?url";
import tokenAliases from "style-guide/css/nbi/token-aliases.css?url";
import nbiUtilities from "style-guide/css/nbi/nbi-utilities.css?url";
import rookObservable from "style-guide/rook-observable.css?url";

const familyStyles: Record<ThemeFamilyId, string[]> = {
  "nbi-rook": [nbiTheme, tokenAliases, nbiUtilities],
  "rook-legacy": [rookObservable],
};

let mountedFamily: ThemeFamilyId | null = null;

export function getMountedFamily(): ThemeFamilyId | null {
  return mountedFamily;
}

export function mountFamilyStyles(familyId: ThemeFamilyId) {
  if (mountedFamily === familyId) return;

  document.querySelectorAll('link[data-sg-theme-layer]').forEach((node) => node.remove());

  for (const href of familyStyles[familyId]) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.sgThemeLayer = familyId;
    document.head.append(link);
  }

  mountedFamily = familyId;
}
