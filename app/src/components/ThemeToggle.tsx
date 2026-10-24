import { getTheme, setTheme } from "../lib/theme";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-kiewit-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return getTheme();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "dark" as const);
  const light = theme === "light";

  return (
    <button
      type="button"
      className="kw-theme-toggle sg-theme-toggle"
      aria-pressed={light}
      onClick={() => setTheme(light ? "dark" : "light")}
    >
      {light ? "Dark" : "Light"}
    </button>
  );
}
