const STORAGE_KEY = "sw-kiewit-theme";

export function getTheme() {
  return document.documentElement.getAttribute("data-kiewit-theme") === "light" ? "light" : "dark";
}

export function setTheme(theme) {
  const next = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-kiewit-theme", next);
  localStorage.setItem(STORAGE_KEY, next);
  syncToggleButton();
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

/**
 * Self-contained inline script for observablehq.config head.
 * Avoids module import path issues in dev/build and waits for body.
 */
export const themeInitScript = `(function(){
  var K="${STORAGE_KEY}";
  function apply(t){
    document.documentElement.setAttribute("data-kiewit-theme",t==="light"?"light":"dark");
    try{localStorage.setItem(K,t==="light"?"light":"dark");}catch(e){}
  }
  function sync(btn){
    var light=document.documentElement.getAttribute("data-kiewit-theme")==="light";
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
      apply(document.documentElement.getAttribute("data-kiewit-theme")==="light"?"dark":"light");
      sync(btn);
    });
    document.body.appendChild(btn);
    sync(btn);
  }
  try{var t=localStorage.getItem(K);if(t==="light")apply("light");}catch(e){}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);
  else mount();
})();`;
