const STORAGE_KEY = "sw-sg-theme";
const LEGACY_STORAGE_KEY = "sw-kiewit-theme";

export type ThemeMode = "light" | "dark";

export function getTheme(): ThemeMode {
  return document.documentElement.getAttribute("data-sg-theme") === "light"
    ? "light"
    : "dark";
}

export function setTheme(theme: ThemeMode) {
  const root = document.documentElement;
  const light = theme === "light";
  if (light) {
    root.setAttribute("data-sg-theme", "light");
  } else {
    root.removeAttribute("data-sg-theme");
  }
  root.style.colorScheme = light ? "light" : "dark";
  try {
    localStorage.setItem(STORAGE_KEY, light ? "light" : "dark");
  } catch {
    /* private mode */
  }
}

export function applyStoredTheme() {
  try {
    let stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "light" && stored !== "dark") {
      stored = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    setTheme(stored === "light" ? "light" : "dark");
  } catch {
    setTheme("dark");
  }
}
