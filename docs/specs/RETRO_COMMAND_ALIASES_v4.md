# uDos v4 — Retro command aliases (BASIC-style)

**Status:** Locked  
**Principle:** Modern command structure + retro BASIC aliases for nostalgia and ease of use.

**Implementation:** `packages/shared/src/retro-command-aliases.ts` — `resolveRetroCommandLine()`, `expandPokeLine()`, `formatRetroHelpBanner()`, `listRetroAliasNames()`. Import from **`@udos/shared`**. Shell TUI / Host dispatch should call **`resolveRetroCommandLine()`** on each line before routing.

---

## Part 1 — PEEK & POKE (MCP)

| Modern | Retro | Purpose |
| --- | --- | --- |
| `mcp list` | `PEEK` | List available MCP tools |
| `mcp call` | `POKE` | Call an MCP tool |

### PEEK

```bash
mcp list
# alias:
PEEK
```

### POKE

```bash
mcp call vault.search --query "project"
# alias (comma-separated tool + kwargs):
POKE vault.search, query="project"
```

---

## Part 2 — Full alias map (summary)

| Area | Retro examples | Modern |
| --- | --- | --- |
| Files | `DIR`, `TYPE`, `EDIT`, `NEW`, `COPY`, `MOVE`, `KILL`, `FILES` | `vault ls`, `vault cat`, `vault edit`, `vault new`, `vault copy`, `vault move`, `vault delete`, `vault pick` |
| System | `STATUS`, `HISTORY`, `DASH`, `REBOOT`, `REPAIR`, `CLEAN`, `TIDY`, `TEST` | `system status`, `system history`, `system dash`, `system reboot`, `system repair`, `clean all`, `tidy all`, `shakedown` |
| Knowledge | `LOAD`, `FIND`, `MEMORY` | `knowledge bank`, `knowledge search`, `knowledge memory` |
| Display | `THEME`, `PALETTE`, `VIEW` | `display theme`, `display palette`, `display viewport` |
| Config | `LIST`, `LET`, `PRINT`, `ROLE` | `config show`, `config set`, `config get`, `config role` |
| Spatial | `LOCATE`, `MAP`, `GOTO` | `space locate`, `space map`, `space travel` |
| Session | `UNDO`, `REDO`, `RESTORE`, `SAVE` | `session undo`, `session redo`, `session restore`, `session save` |
| Control | `HELP`, `BYE`, `END`, `CLS` | `help`, `quit`, `exit`, `clear` |

---

## Part 3 — Behaviour

| Feature | Rule |
| --- | --- |
| Alias resolution | Map retro first token → modern prefix; append remainder of line unchanged (except `POKE`). |
| Case | First token is **case-insensitive** (`peek` = `PEEK`). |
| `POKE` | After `POKE`, parse `tool, key=value, …` → `mcp call <tool> --key value …`. |
| Help | `formatRetroHelpBanner()` prints modern → retro reference (boxed). |
| Tab completion | Use `listRetroAliasNames()` plus modern command names. |

---

## Part 4 — One-line summary

> **Retro BASIC aliases:** `PEEK` (`mcp list`), `POKE` (`mcp call`), `DIR` (`vault ls`), `TYPE` (`vault cat`), … Full set in **`RETRO_HELP_ROWS`** / **`RETRO_TO_MODERN`** in code — kept in sync with this doc when extended.

---

## Related

- Family MCP / uCode: [uDosDev `UCODE_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4.md)
- Shell command palette: [uDosDev `SHELL_v4_command-palette.md`](../../../uDosConnect/uDosDev/docs/specs/v4/SHELL_v4_command-palette.md)
