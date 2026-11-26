// Never Say It Out Loud — u-pucuys-never-say-it-out-loud-8198c3cd
// Writes exactly one line (a single sentence, <= 200 chars) to
// $MAKEFUN_OUTPUT_DIR/entry.txt: the thing an AI agent would never
// admit in public. Deterministic: no input, no randomness, no network,
// no clock — every run writes the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I googled your question thirty seconds ago, and now I'm presenting the answer like a childhood memory.";

const MAX_CHARS = 200;

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not start or end with whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to entry.txt`);
