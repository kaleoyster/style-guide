const STORAGE_KEY = "sw-sg-theme";
const LEGACY_STORAGE_KEY = "sw-kiewit-theme";

function applyTheme(theme) {
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
  syncToggleButton();
}

export function getTheme() {
  return document.documentElement.getAttribute("data-sg-theme") === "light"
    ? "light"
    : "dark";
}

export function setTheme(theme) {
  applyTheme(theme === "light" ? "light" : "dark");
}

export function toggleTheme() {
  setTheme(getTheme() === "light" ? "dark" : "light");
}

function syncToggleButton() {
  const btn = document.getElementById("kw-theme-toggle");
  if (!btn) return;
  const light = getTheme() === "light";
  btn.setAttribute("aria-pressed", light ? "true" : "false");
  btn.textContent = light ? "Dark" : "Light";
  btn.title = light ? "Switch to dark theme" : "Switch to light theme";
}

function mountToggleButton() {
  if (document.getElementById("kw-theme-toggle")) {
    syncToggleButton();
    return;
  }
  const btn = document.createElement("button");
  btn.id = "kw-theme-toggle";
  btn.type = "button";
  btn.className = "kw-theme-toggle";
  btn.addEventListener("click", toggleTheme);
  document.body.appendChild(btn);
  syncToggleButton();
}

/** Floating toggle — safe to call from page modules after DOM ready. */
export function initThemeToggle() {
  if (document.body) mountToggleButton();
  else document.addEventListener("DOMContentLoaded", mountToggleButton, {once: true});
}

function readStoredTheme() {
  try {
    let t = localStorage.getItem(STORAGE_KEY);
    if (t !== "light" && t !== "dark") {
      t = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    return t === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

/**
 * Self-contained inline script for observablehq.config head.
 * Runs before paint to avoid flash; mounts toggle after body exists.
 */
export const themeInitScript = `(function(){
  var K="${STORAGE_KEY}";
  var L="${LEGACY_STORAGE_KEY}";
  function apply(t){
    var root=document.documentElement;
    var light=t==="light";
    if(light)root.setAttribute("data-sg-theme","light");
    else root.removeAttribute("data-sg-theme");
    root.style.colorScheme=light?"light":"dark";
    try{localStorage.setItem(K,light?"light":"dark");}catch(e){}
  }
  function read(){
    try{
      var t=localStorage.getItem(K);
      if(t!=="light"&&t!=="dark")t=localStorage.getItem(L);
      return t==="light"?"light":"dark";
    }catch(e){return "dark";}
  }
  function sync(btn){
    var light=document.documentElement.getAttribute("data-sg-theme")==="light";
    btn.setAttribute("aria-pressed",light?"true":"false");
    btn.textContent=light?"Dark":"Light";
    btn.title=light?"Switch to dark theme":"Switch to light theme";
  }
  function mount(){
    if(document.getElementById("kw-theme-toggle")){sync(document.getElementById("kw-theme-toggle"));return;}
    var btn=document.createElement("button");
    btn.id="kw-theme-toggle";
    btn.type="button";
    btn.className="kw-theme-toggle";
    btn.addEventListener("click",function(){
      var next=document.documentElement.getAttribute("data-sg-theme")==="light"?"dark":"light";
      apply(next);
      sync(btn);
    });
    document.body.appendChild(btn);
    sync(btn);
  }
  apply(read());
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);
  else mount();
})();`;
