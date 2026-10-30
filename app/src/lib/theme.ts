import {
  PRESET_STORAGE_KEY,
  getPreset,
  parsePresetId,
  presetIdFor,
  themePresets,
} from "style-guide/js/themes/catalog.js";
import { mountFamilyStyles } from "./themeStyles";

export type ThemeMode = "light" | "dark";
export type ThemeFamilyId = "nbi-rook" | "rook-legacy";
export type ThemePresetId = `${ThemeFamilyId}-${ThemeMode}`;

const THEME_CHANGE_EVENT = "sg-theme-preset-change";

function notifyChange() {
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function applyFamilyMode(familyId: ThemeFamilyId, mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.sgThemeFamily = familyId;
  root.style.colorScheme = mode;

  if (familyId === "nbi-rook") {
    root.dataset.nbiTheme = mode;
    root.removeAttribute("data-sg-theme");
    try {
      localStorage.setItem("nbi-rook-theme", mode);
    } catch {
      /* private mode */
    }
  } else {
    delete root.dataset.nbiTheme;
    if (mode === "light") {
      root.setAttribute("data-sg-theme", "light");
    } else {
      root.removeAttribute("data-sg-theme");
    }
    try {
      localStorage.setItem("sw-sg-theme", mode);
    } catch {
      /* private mode */
    }
  }
}

export function getActivePresetId(): ThemePresetId {
  const family = getActiveFamilyId();
  const mode = getActiveMode();
  return presetIdFor(family, mode);
}

export function getActiveFamilyId(): ThemeFamilyId {
  const fromDom = document.documentElement.dataset.sgThemeFamily;
  if (fromDom === "nbi-rook" || fromDom === "rook-legacy") {
    return fromDom;
  }
  if (document.documentElement.hasAttribute("data-sg-theme")) {
    return "rook-legacy";
  }
  if (document.documentElement.dataset.nbiTheme) {
    return "nbi-rook";
  }
  return "nbi-rook";
}

export function getActiveMode(): ThemeMode {
  const family = getActiveFamilyId();
  if (family === "nbi-rook") {
    return document.documentElement.dataset.nbiTheme === "light" ? "light" : "dark";
  }
  return document.documentElement.getAttribute("data-sg-theme") === "light"
    ? "light"
    : "dark";
}

/** @deprecated Use getActiveMode */
export function getTheme(): ThemeMode {
  return getActiveMode();
}

export function applyPreset(presetId: ThemePresetId) {
  const preset = getPreset(presetId);
  mountFamilyStyles(preset.familyId);
  applyFamilyMode(preset.familyId, preset.mode);
  try {
    localStorage.setItem(PRESET_STORAGE_KEY, presetId);
  } catch {
    /* private mode */
  }
  notifyChange();
}

export function setThemeMode(mode: ThemeMode) {
  applyPreset(presetIdFor(getActiveFamilyId(), mode));
}

/** @deprecated Use setThemeMode */
export function setTheme(theme: ThemeMode) {
  setThemeMode(theme);
}

export function setThemeFamily(familyId: ThemeFamilyId) {
  applyPreset(presetIdFor(familyId, getActiveMode()));
}

function inferPresetFromLegacyStorage(): ThemePresetId | null {
  try {
    const storedPreset = localStorage.getItem(PRESET_STORAGE_KEY);
    if (storedPreset && themePresets.some((p) => p.id === storedPreset)) {
      return storedPreset as ThemePresetId;
    }

    const nbi = localStorage.getItem("nbi-rook-theme");
    if (nbi === "light" || nbi === "dark") {
      return presetIdFor("nbi-rook", nbi);
    }

    for (const key of ["sw-sg-theme", "sw-kiewit-theme"]) {
      const legacy = localStorage.getItem(key);
      if (legacy === "light" || legacy === "dark") {
        return presetIdFor("rook-legacy", legacy);
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function applyStoredTheme() {
  const presetId = inferPresetFromLegacyStorage() ?? "nbi-rook-dark";
  applyPreset(presetId);
}

export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-nbi-theme", "data-sg-theme", "data-sg-theme-family"],
  });
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => {
    observer.disconnect();
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
}

export { parsePresetId, presetIdFor, themePresets };
