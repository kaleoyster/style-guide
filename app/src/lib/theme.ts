const STORAGE_KEY = "sw-kiewit-theme";

export type ThemeMode = "light" | "dark";

export function getTheme(): ThemeMode {
  return document.documentElement.getAttribute("data-kiewit-theme") === "light"
    ? "light"
    : "dark";
}

export function setTheme(theme: ThemeMode) {
  const next = theme === "light" ? "light" : "dark";
  if (next === "light") {
    document.documentElement.setAttribute("data-kiewit-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-kiewit-theme");
  }
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode */
  }
}

export function applyStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light") setTheme("light");
  } catch {
    /* ignore */
  }
}
