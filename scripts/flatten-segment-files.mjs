/**
 * Works around a Next.js static-export bug on Windows.
 *
 * The client router requests prefetch payloads with flat, dot-separated names
 * (e.g. /services/__next.services.__PAGE__.txt), but on Windows the exporter
 * builds those names from backslash-separated paths and writes nested folders
 * (services/__next.services/__PAGE__.txt) instead. This script flattens any such
 * folders into the expected file names. On Linux/macOS (including Cloudflare
 * Pages builds) nothing matches and the script is a no-op.
 */
import { readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
let moved = 0;

function filesUnder(dir, prefix = []) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? filesUnder(full, [...prefix, name]) : [{ full, parts: [...prefix, name] }];
  });
}

function visit(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.") && dir !== join(OUT, "_next")) {
      for (const { full: file, parts } of filesUnder(full)) {
        renameSync(file, join(dir, [name, ...parts].join(".")));
        moved++;
      }
      rmSync(full, { recursive: true });
    } else if (full !== join(OUT, "_next")) {
      visit(full);
    }
  }
}

visit(OUT);
if (moved) console.log(`flatten-segment-files: normalized ${moved} prefetch file(s).`);
