import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "style-guide/variables.css";
import "style-guide/rook/brand-theme.css";
import "style-guide/rook/brand-theme-light.css";
import { applyStoredTheme } from "./lib/theme.ts";
import App from "./App.tsx";
import "./index.css";

applyStoredTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
