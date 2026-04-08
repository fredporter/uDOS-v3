/**
 * Locked grid–graphics constants for uDOS v3.
 * @see docs/GRID-GRAPHICS-CANON.md
 * @see docs/DISPLAY_STACK.md
 * @see sibling UniversalSurfaceXD/docs/decisions/UniversalSurfaceXD_v2-cannon.md
 */
export const USXD_SCHEMA_VERSION = "usxd/0.1" as const;

export const CANONICAL_VIEWPORT_COLS = 80;
export const CANONICAL_VIEWPORT_ROWS = 30;

/** Half-scale viewport (mini grid) where used. */
export const CANONICAL_MINI_COLS = 40;
export const CANONICAL_MINI_ROWS = 15;

/** Pixel raster inside one grid cell (non-square tile). */
export const CANONICAL_TILE_PX_W = 16;
export const CANONICAL_TILE_PX_H = 24;

/** Teletext mosaic subdivision per character cell (Acorn-style). */
export const TELETEXT_MOSAIC_COLS = 2;
export const TELETEXT_MOSAIC_ROWS = 3;

/** Teletext 2×3 subcell size inside a 16×24 tile (8 px per subcell). */
export const TELETEXT_SUBCELL_PX = 8;

/** Wide glyphs / emoji footprint in cells (2×1). */
export const WIDE_GLYPH_CELL_W = 2;
export const WIDE_GLYPH_CELL_H = 1;

/** Canonical graphics fallback ladder (labels). */
export const GRAPHICS_FALLBACK_LADDER = [
  "teletext",
  "ascii-block",
  "shades",
  "ascii",
] as const;

export function canonicalCanvasPx(): { width: number; height: number } {
  return {
    width: CANONICAL_VIEWPORT_COLS * CANONICAL_TILE_PX_W,
    height: CANONICAL_VIEWPORT_ROWS * CANONICAL_TILE_PX_H,
  };
}
