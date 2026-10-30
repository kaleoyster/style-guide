const STORAGE_KEY = "nbi-rook-theme";
const LEGACY_KEYS = ["sw-sg-theme", "sw-kiewit-theme"];

function applyTheme(theme) {
  const root = document.documentElement;
  const next = theme === "light" ? "light" : "dark";
  root.dataset.nbiTheme = next;
  root.style.colorScheme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode */
  }
  syncToggleButton();
}

export function getTheme() {
  return document.documentElement.dataset.nbiTheme === "light" ? "light" : "dark";
}

export function setTheme(theme) {
  applyTheme(theme === "light" ? "light" : "dark");
}

export function toggleTheme() {
  setTheme(getTheme() === "light" ? "dark" : "light");
}

function syncToggleButton() {
  const btn = document.querySelector(".nbi-theme-switch[data-sg-managed]");
  if (!btn) return;
  const light = getTheme() === "light";
  btn.textContent = light ? "Dark" : "Light";
  btn.setAttribute(
    "aria-label",
    `Switch to ${light ? "dark" : "light"} theme`,
  );
}

/** Mount floating toggle (Observable-style). Skips if one already exists. */
export function initThemeToggle() {
  if (document.querySelector(".nbi-theme-switch")) {
    syncToggleButton();
    return;
  }
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "nbi-theme-switch";
  btn.dataset.sgManaged = "true";
  btn.addEventListener("click", () => toggleTheme());
  document.body.append(btn);
  syncToggleButton();
}

function readStoredTheme() {
  try {
    let stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "light" && stored !== "dark") {
      for (const key of LEGACY_KEYS) {
        const legacy = localStorage.getItem(key);
        if (legacy === "light" || legacy === "dark") {
          stored = legacy;
          break;
        }
      }
    }
    return stored === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function applyStoredTheme() {
  applyTheme(readStoredTheme());
}

/**
 * Inline script for observablehq.config `head` (runs before paint).
 */
export const themeInitScript = `(function(){
  var K="${STORAGE_KEY}";
  var LEGACY=["sw-sg-theme","sw-kiewit-theme"];
  function apply(t){
    var root=document.documentElement;
    var next=t==="light"?"light":"dark";
    root.dataset.nbiTheme=next;
    root.style.colorScheme=next;
    try{localStorage.setItem(K,next);}catch(e){}
  }
  function read(){
    try{
      var t=localStorage.getItem(K);
      if(t!=="light"&&t!=="dark"){
        for(var i=0;i<LEGACY.length;i++){
          var v=localStorage.getItem(LEGACY[i]);
          if(v==="light"||v==="dark"){t=v;break;}
        }
      }
      return t==="light"?"light":"dark";
    }catch(e){return "dark";}
  }
  function sync(btn){
    var light=document.documentElement.dataset.nbiTheme==="light";
    btn.textContent=light?"Dark":"Light";
    btn.setAttribute("aria-label","Switch to "+(light?"dark":"light")+" theme");
  }
  function mount(){
    if(document.querySelector(".nbi-theme-switch"))return;
    var btn=document.createElement("button");
    btn.type="button";
    btn.className="nbi-theme-switch";
    btn.addEventListener("click",function(){
      apply(document.documentElement.dataset.nbiTheme==="dark"?"light":"dark");
      sync(btn);
    });
    document.body.append(btn);
    sync(btn);
  }
  apply(read());
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);
  else mount();
})();`;
