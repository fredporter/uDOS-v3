import { useCallback, useState } from "react";
import type { ThinUiThemeId } from "./theme";
import { getDomTheme, setThinUiTheme } from "./theme";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThinUiThemeId>(() => getDomTheme());

  const onChange = useCallback((next: ThinUiThemeId) => {
    setThinUiTheme(next);
    setTheme(next);
  }, []);

  return (
    <div className="theme-switcher">
      <label htmlFor="thinui-theme">Theme</label>
      <select
        id="thinui-theme"
        value={theme}
        onChange={(e) => onChange(e.target.value as ThinUiThemeId)}
      >
        <option value="default-dark">Default (dark)</option>
        <option value="classic-modern">Classic Modern</option>
      </select>
    </div>
  );
}
