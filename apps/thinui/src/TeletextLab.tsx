import { useCallback, useState } from "react";
import {
  CANONICAL_TILE_PX_H,
  CANONICAL_TILE_PX_W,
  TELETEXT_SUBCELL_PX,
} from "@udos/shared";
import { ThemeSwitcher } from "./ThemeSwitcher";

/** Visual scale so one 16×24 logical cell is easy to see on screen. */
const SCALE = 8;

const cellW = CANONICAL_TILE_PX_W * SCALE;
const cellH = CANONICAL_TILE_PX_H * SCALE;
const subW = TELETEXT_SUBCELL_PX * SCALE;
const subH = TELETEXT_SUBCELL_PX * SCALE;

/** Row-major 2×3: indices 0,1 top; 2,3 mid; 4,5 bottom. */
const BLOCK_LABELS = ["1", "2", "3", "4", "5", "6"] as const;

export function TeletextLab() {
  const [mask, setMask] = useState(0b111111);

  const toggle = useCallback((bit: number) => {
    setMask((m) => m ^ (1 << bit));
  }, []);

  return (
    <div className="teletext-lab shell">
      <header className="top">
        <div>
          <h1>Teletext mosaic lab</h1>
          <p className="muted">
            One character cell = {CANONICAL_TILE_PX_W}×{CANONICAL_TILE_PX_H}px logical;
            mosaic {TELETEXT_SUBCELL_PX}×{TELETEXT_SUBCELL_PX}px subcells (2×3). Display
            scaled ×{SCALE}.
          </p>
        </div>
        <div className="top__actions">
          <ThemeSwitcher />
          <a className="btn-link" href="#/">
            ← ThinUI home
          </a>
        </div>
      </header>

      <div className="teletext-lab__demo">
        <div
          className="teletext-lab__cell"
          style={{
            width: cellW,
            height: cellH,
            display: "grid",
            gridTemplateColumns: `repeat(2, ${subW}px)`,
            gridTemplateRows: `repeat(3, ${subH}px)`,
            gap: 0,
            border: "2px solid #4da3ff",
            background: "#0b0e14",
          }}
          aria-label="Teletext character cell (2 by 3 mosaic blocks)"
        >
          {BLOCK_LABELS.map((label, i) => {
            const on = ((mask >> i) & 1) === 1;
            return (
              <button
                key={label}
                type="button"
                className={`teletext-lab__block${on ? " teletext-lab__block--on" : ""}`}
                style={{ width: subW, height: subH }}
                onClick={() => toggle(i)}
                title={`Block ${label} — click to toggle`}
              >
                <span className="teletext-lab__block-label">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="teletext-lab__side">
          <p className="muted small">
            Click blocks to toggle. Mask (bits 1→6, low bit = block 1):{" "}
            <code>0x{mask.toString(16).padStart(2, "0")}</code>
          </p>
          <div className="teletext-lab__presets">
            <button type="button" onClick={() => setMask(0b111111)}>
              All on
            </button>
            <button type="button" onClick={() => setMask(0)}>
              All off
            </button>
            <button type="button" onClick={() => setMask(0b010101)}>
              Left column (1,3,5)
            </button>
            <button type="button" onClick={() => setMask(0b001100)}>
              Middle row (3,4)
            </button>
          </div>
        </div>
      </div>

      <p className="muted small teletext-lab__doc">
        Spec: <code>docs/teletext_engine.md</code>, <code>docs/DISPLAY_STACK.md</code>,{" "}
        <code>docs/style-guide.md</code>
      </p>
    </div>
  );
}
