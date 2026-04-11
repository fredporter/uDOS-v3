import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  CANONICAL_TILE_PX_H,
  CANONICAL_TILE_PX_W,
  CANONICAL_VIEWPORT_COLS,
  CANONICAL_VIEWPORT_ROWS,
} from "@udos/shared";
import { Shell } from "./Shell";
import { getInitialTheme, setThinUiTheme } from "./theme";
import "./styles.css";
import "./classic-modern.css";

setThinUiTheme(getInitialTheme());

const rootEl = document.documentElement;
rootEl.style.setProperty(
  "--udos-viewport-cols",
  String(CANONICAL_VIEWPORT_COLS)
);
rootEl.style.setProperty(
  "--udos-viewport-rows",
  String(CANONICAL_VIEWPORT_ROWS)
);
rootEl.style.setProperty("--udos-tile-px-w", String(CANONICAL_TILE_PX_W));
rootEl.style.setProperty("--udos-tile-px-h", String(CANONICAL_TILE_PX_H));

const el = document.getElementById("root");
if (!el) {
  throw new Error("Missing #root");
}

createRoot(el).render(
  <StrictMode>
    <Shell />
  </StrictMode>
);
