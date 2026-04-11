/** ThinUI theme ids — pairs with USXD `classic-modern-inspiration` / profile `udos.classic-modern`. */

export type ThinUiThemeId = "default-dark" | "classic-modern";

const STORAGE_KEY = "udos-thinui-theme";

function readQueryTheme(): ThinUiThemeId | null {
  const q = new URLSearchParams(window.location.search).get("theme");
  if (q === "classic-modern" || q === "classic") return "classic-modern";
  if (q === "default" || q === "dark") return "default-dark";
  return null;
}

function readStoredTheme(): ThinUiThemeId | null {
  const s = localStorage.getItem(STORAGE_KEY);
  return s === "classic-modern" ? "classic-modern" : s === "default-dark" ? "default-dark" : null;
}

/** URL query wins, then localStorage, then default dark. Persists query choice to storage. */
export function getInitialTheme(): ThinUiThemeId {
  const q = readQueryTheme();
  if (q) {
    localStorage.setItem(STORAGE_KEY, q);
    return q;
  }
  return readStoredTheme() ?? "default-dark";
}

export function getDomTheme(): ThinUiThemeId {
  const d = document.documentElement.dataset.thinuiTheme;
  return d === "classic-modern" ? "classic-modern" : "default-dark";
}

export function setThinUiTheme(id: ThinUiThemeId): void {
  document.documentElement.dataset.thinuiTheme = id;
  localStorage.setItem(STORAGE_KEY, id);
}
