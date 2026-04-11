#!/usr/bin/env node
/**
 * blocktext — retro block banner for terminal / Sonic splash hooks.
 * @see uDosDev SONIC_SCREWDRIVER_v4_COMPLETE_BRIEF.md Part 10
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PKG = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const VERSION = PKG.version ?? "0.0.0";

/** 61-col SONIC + uDOS lines (compact enough for most terminals). */
const SPLASH_FULL = [
  "█████████████████████████████████████████████████████████████",
  "██                                                        ██",
  "██   ███████╗ ██████╗ ███╗   ██╗██╗ ██████╗                ██",
  "██   ██╔════╝██╔═══██╗████╗  ██║██║██╔════╝                ██",
  "██   ███████╗██║   ██║██╔██╗ ██║██║██║                     ██",
  "██   ╚════██║██║   ██║██║╚██╗██║██║██║                     ██",
  "██   ███████║╚██████╔╝██║ ╚████║██║╚██████╗                ██",
  "██   ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝ ╚═════╝                ██",
  "██                                                        ██",
  "██   ███████╗ ██████╗ ██████╗ ███████╗██╗   ██╗██╗        ██",
  "██   ██╔════╝██╔════╝██╔════╝ ██╔════╝╚██╗ ██╔╝██║        ██",
  "██   ███████╗██║     ██║  ███╗█████╗   ╚████╔╝ ██║        ██",
  "██   ╚════██║██║     ██║   ██║██╔══╝    ╚██╔╝  ██║        ██",
  "██   ███████║╚██████╗╚██████╔╝███████╗   ██║   ██║        ██",
  "██   ╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝        ██",
  "██                                                        ██",
  "██              \"GOTTA GO FAST!\" — Sonic                  ██",
  "█████████████████████████████████████████████████████████████",
];

const SPLASH_COMPACT = [
  "██████████████████████████████",
  "██   SONIC · uDOS boot      ██",
  "██   GOTTA GO FAST!         ██",
  "██████████████████████████████",
];

function printBorderOnly() {
  const w = 78;
  console.log(`╔${"═".repeat(w)}╗`);
  for (let i = 0; i < 3; i++) {
    console.log(`║${" ".repeat(w)}║`);
  }
  console.log(`╚${"═".repeat(w)}╝`);
}

function printHelp() {
  const lines = [
    "╔══════════════════════════════════════════════════════════════╗",
    "║                 BLOCK TEXT — uDosGo                          ║",
    "╠══════════════════════════════════════════════════════════════╣",
    "║  blocktext              Default SONIC / uDOS banner         ║",
    "║  blocktext --compact    Short banner                        ║",
    "║  blocktext --border     Empty framed box                    ║",
    "║  blocktext --version    Version string                      ║",
    "║  blocktext --help       This screen                         ║",
    "║  blocktext --text MSG   Reserved (custom art — future)      ║",
    "╚══════════════════════════════════════════════════════════════╝",
  ];
  console.log(lines.join("\n"));
}

function printVersionBlock() {
  console.log(`
 ██╗   ██╗██████╗  ██████╗ ███████╗      v${VERSION}
 ██║   ██║██╔══██╗██╔═══██╗██╔════╝
 ██║   ██║██║  ██║██║   ██║███████╗
 ██║   ██║██║  ██║██║   ██║╚════██║
 ╚██████╔╝██████╔╝╚██████╔╝███████║
  ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝
  uDosGo · blocktext
`.trim());
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    printHelp();
    return;
  }
  if (argv.includes("--version") || argv.includes("-v")) {
    printVersionBlock();
    return;
  }
  if (argv.includes("--border")) {
    printBorderOnly();
    return;
  }
  const compact = argv.includes("--compact");
  if (argv.includes("--text")) {
    const i = argv.indexOf("--text");
    const msg = argv.slice(i + 1).join(" ").trim() || "uDOS";
    console.log(
      `[blocktext] Custom block art for "${msg}" is not implemented yet — use default banner or extend scripts/blocktext.mjs.`,
    );
    return;
  }
  const art = compact ? SPLASH_COMPACT : SPLASH_FULL;
  console.log(art.join("\n"));
}

main();
