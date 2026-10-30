/// <reference types="vite/client" />

declare module "style-guide/js/nbi/palette.js" {
  export const foundation: {
    neutral: readonly string[];
    yellow: readonly string[];
  };
  export const semantic: {
    good: string;
    fair: string;
    poor: string;
    unrated: string;
  };
  export const categoricalSets: Record<number, readonly string[]>;
  export const sequentialSets: {
    condition5: readonly string[];
  };
}

declare module "style-guide/js/themes/catalog.js" {
  export type ThemeFamilyId = "nbi-rook" | "rook-legacy";
  export type ThemeMode = "light" | "dark";
  export type ThemePresetId = `${ThemeFamilyId}-${ThemeMode}`;

  export const PRESET_STORAGE_KEY: string;
  export const themeFamilies: ReadonlyArray<{
    id: ThemeFamilyId;
    name: string;
    status: string;
    summary: string;
    htmlHook: string;
    htmlValues: { dark: string; light: string };
    storageKey: string;
    observableBundle: string;
    docs: string;
  }>;
  export const themePresets: ReadonlyArray<{
    id: ThemePresetId;
    familyId: ThemeFamilyId;
    mode: ThemeMode;
    label: string;
    preview: { page: string; surface: string; text: string; accent: string };
  }>;
  export const platformThemes: ReadonlyArray<{
    id: string;
    name: string;
    status: string;
    summary: string;
  }>;
  export function getPreset(id: ThemePresetId): (typeof themePresets)[number];
  export function presetIdFor(
    familyId: ThemeFamilyId,
    mode: ThemeMode,
  ): ThemePresetId;
  export function parsePresetId(presetId: ThemePresetId): {
    familyId: ThemeFamilyId;
    mode: ThemeMode;
  };
}
