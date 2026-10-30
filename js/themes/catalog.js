/**
 * Named theme catalog — families, presets (family + mode), and preview snapshots.
 * Used by the Vite catalog, docs, and Observable/Vite integrators.
 */

/** @typedef {"nbi-rook" | "rook-legacy"} ThemeFamilyId */
/** @typedef {"light" | "dark"} ThemeMode */
/** @typedef {`${ThemeFamilyId}-${ThemeMode}`} ThemePresetId */

/** @type {const} */
export const themeFamilies = Object.freeze([
  Object.freeze({
    id: "nbi-rook",
    name: "NBI Rook",
    status: "canonical",
    summary:
      "Warm cream / near-black surfaces, --nbi-* tokens, chart palette, .nbi-* layout (nbi-rook Observable).",
    htmlHook: "data-nbi-theme",
    htmlValues: Object.freeze({ dark: "dark", light: "light" }),
    storageKey: "nbi-rook-theme",
    legacyStorageKeys: Object.freeze(["sw-sg-theme", "sw-kiewit-theme"]),
    cssEntrypoints: Object.freeze([
      "style-guide/css/nbi/nbi-theme.css",
      "style-guide/css/nbi/token-aliases.css",
      "style-guide/css/nbi/nbi-utilities.css",
    ]),
    observableBundle: "style-guide/nbi-observable.css",
    toggleClass: "nbi-theme-switch",
    docs: "docs/theme-nbi.md",
  }),
  Object.freeze({
    id: "rook-legacy",
    name: "Rook Legacy",
    status: "legacy",
    summary:
      "Split brand theme (--brand-*, --kw-*) for earlier Rook Observable dashboards and analysis grids.",
    htmlHook: "data-sg-theme",
    htmlValues: Object.freeze({ dark: "(attribute absent)", light: "light" }),
    storageKey: "sw-sg-theme",
    legacyStorageKeys: Object.freeze(["sw-kiewit-theme"]),
    cssEntrypoints: Object.freeze(["style-guide/rook-observable.css"]),
    observableBundle: "style-guide/rook-observable.css",
    toggleClass: "kw-theme-toggle",
    docs: "docs/theme-rook.md",
  }),
]);

/**
 * Fully named presets: one row per appearance users can select.
 * @type {ReadonlyArray<{
 *   id: ThemePresetId,
 *   familyId: ThemeFamilyId,
 *   mode: ThemeMode,
 *   label: string,
 *   preview: { page: string, surface: string, text: string, accent: string },
 * }>}
 */
export const themePresets = Object.freeze([
  Object.freeze({
    id: "nbi-rook-dark",
    familyId: "nbi-rook",
    mode: "dark",
    label: "NBI Rook · Dark",
    preview: Object.freeze({
      page: "#090b0c",
      surface: "#131618",
      text: "#f7f4e9",
      accent: "#ffd200",
    }),
  }),
  Object.freeze({
    id: "nbi-rook-light",
    familyId: "nbi-rook",
    mode: "light",
    label: "NBI Rook · Light",
    preview: Object.freeze({
      page: "#f4f0e3",
      surface: "#fffdf6",
      text: "#191a17",
      accent: "#6b5200",
    }),
  }),
  Object.freeze({
    id: "rook-legacy-dark",
    familyId: "rook-legacy",
    mode: "dark",
    label: "Rook Legacy · Dark",
    preview: Object.freeze({
      page: "#0f0f0f",
      surface: "#161616",
      text: "#f5f5f5",
      accent: "#ffd200",
    }),
  }),
  Object.freeze({
    id: "rook-legacy-light",
    familyId: "rook-legacy",
    mode: "light",
    label: "Rook Legacy · Light",
    preview: Object.freeze({
      page: "#f8f9fa",
      surface: "#ffffff",
      text: "#1e293b",
      accent: "#9a7400",
    }),
  }),
]);

/** Reference-only — styled by Observable Framework, not this package. */
export const platformThemes = Object.freeze([
  Object.freeze({
    id: "observable-air",
    name: "Observable · Air",
    status: "platform",
    summary: "Default Observable Framework theme (observablehq.config theme: \"air\"). NBI/Rook CSS layers on top.",
    docs: "https://observablehq.com/framework/config#theme",
  }),
]);

export const PRESET_STORAGE_KEY = "sg-theme-preset";

/** @param {ThemePresetId | string} id */
export function getPreset(id) {
  const preset = themePresets.find((p) => p.id === id);
  if (!preset) throw new Error(`Unknown theme preset: ${id}`);
  return preset;
}

/** @param {ThemeFamilyId} familyId */
export function getFamily(familyId) {
  const family = themeFamilies.find((f) => f.id === familyId);
  if (!family) throw new Error(`Unknown theme family: ${familyId}`);
  return family;
}

/** @param {ThemeFamilyId} familyId @param {ThemeMode} mode */
export function presetIdFor(familyId, mode) {
  return /** @type {ThemePresetId} */ (`${familyId}-${mode}`);
}

/** @param {ThemePresetId} presetId */
export function parsePresetId(presetId) {
  const preset = getPreset(presetId);
  return { familyId: preset.familyId, mode: preset.mode };
}
