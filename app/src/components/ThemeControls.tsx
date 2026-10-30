import {
  applyPreset,
  getActiveFamilyId,
  getActiveMode,
  getActivePresetId,
  setThemeFamily,
  setThemeMode,
  subscribeTheme,
  type ThemeFamilyId,
  type ThemePresetId,
} from "../lib/theme";
import { themeFamilies, themePresets } from "style-guide/js/themes/catalog.js";
import { useSyncExternalStore } from "react";
import styles from "./ThemeControls.module.css";

function getSnapshot() {
  return getActivePresetId();
}

export function ThemeControls() {
  const presetId = useSyncExternalStore(subscribeTheme, getSnapshot, () => "nbi-rook-dark");
  const mode = useSyncExternalStore(subscribeTheme, getActiveMode, () => "dark");
  const familyId = useSyncExternalStore(subscribeTheme, getActiveFamilyId, () => "nbi-rook");

  const activePreset = themePresets.find((p) => p.id === presetId);
  const light = mode === "light";

  return (
    <div className={styles.wrap}>
      <label className={styles.field}>
        <span className={styles.label}>Named theme</span>
        <select
          className={styles.select}
          value={presetId}
          onChange={(event) => applyPreset(event.target.value as ThemePresetId)}
        >
          {themeFamilies.map((family) => (
            <optgroup key={family.id} label={family.name}>
              {themePresets
                .filter((p) => p.familyId === family.id)
                .map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Family</span>
        <select
          className={styles.select}
          value={familyId}
          onChange={(event) => setThemeFamily(event.target.value as ThemeFamilyId)}
        >
          {themeFamilies.map((family) => (
            <option key={family.id} value={family.id}>
              {family.name} ({family.status})
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className={
          familyId === "nbi-rook"
            ? "nbi-theme-switch sg-theme-toggle"
            : "kw-theme-toggle sg-theme-toggle"
        }
        aria-label={`Switch to ${light ? "dark" : "light"} mode`}
        onClick={() => setThemeMode(light ? "dark" : "light")}
      >
        {light ? "Dark" : "Light"}
      </button>

      {activePreset ? (
        <p className={styles.hint}>
          Active: <strong>{activePreset.label}</strong>
        </p>
      ) : null}
    </div>
  );
}
