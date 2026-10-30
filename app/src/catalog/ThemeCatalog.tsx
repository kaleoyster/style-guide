import { platformThemes, themeFamilies, themePresets } from "style-guide/js/themes/catalog.js";
import styles from "./catalog.module.css";

function PreviewStrip({ page, surface, text, accent }: {
  page: string;
  surface: string;
  text: string;
  accent: string;
}) {
  return (
    <div className={styles.themePreview} aria-hidden>
      <span style={{ background: page }} title="Page" />
      <span style={{ background: surface }} title="Surface" />
      <span style={{ background: text }} title="Text" />
      <span style={{ background: accent }} title="Accent" />
    </div>
  );
}

export function ThemeCatalog() {
  return (
    <>
      <div className={styles.themeTableWrap}>
        <table className={styles.themeTable}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Family</th>
              <th scope="col">Mode</th>
              <th scope="col">Preview</th>
              <th scope="col">HTML</th>
              <th scope="col">Storage</th>
            </tr>
          </thead>
          <tbody>
            {themePresets.map((preset) => {
              const family = themeFamilies.find((f) => f.id === preset.familyId)!;
              const htmlValue =
                preset.mode === "light"
                  ? family.htmlValues.light
                  : family.htmlValues.dark;
              return (
                <tr key={preset.id}>
                  <td>
                    <strong>{preset.label}</strong>
                    <span className={`${styles.themeStatus} ${styles[`themeStatus--${family.status}`]}`}>
                      {family.status}
                    </span>
                  </td>
                  <td>
                    <code>{preset.id}</code>
                  </td>
                  <td>{family.name}</td>
                  <td>{preset.mode}</td>
                  <td>
                    <PreviewStrip {...preset.preview} />
                  </td>
                  <td>
                    <code>
                      {family.htmlHook}={htmlValue === "(attribute absent)" ? "—" : htmlValue}
                    </code>
                  </td>
                  <td>
                    <code>{family.storageKey}</code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3>Families</h3>
      <ul className={styles.themeFamilyList}>
        {themeFamilies.map((family) => (
          <li key={family.id}>
            <strong>{family.name}</strong> (<code>{family.id}</code>) — {family.summary}
            <br />
            <span className={styles.themeMeta}>
              Bundle: <code>{family.observableBundle}</code> · Docs:{" "}
              <code>{family.docs}</code>
            </span>
          </li>
        ))}
      </ul>

      <h3>Platform (reference)</h3>
      <ul className={styles.themeFamilyList}>
        {platformThemes.map((theme) => (
          <li key={theme.id}>
            <strong>{theme.name}</strong> (<code>{theme.id}</code>) — {theme.summary}
          </li>
        ))}
      </ul>
    </>
  );
}
